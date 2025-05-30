import React, { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../services/authService";
import { fetchUserById, updateUser, deleteUser } from "../services/userService";
import { fetchOrdersById } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import Navbar from "../includes/Navbar";

const Profil = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [form, setForm] = useState({ name: "", email: "" });
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Charger l'utilisateur au premier rendu
  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser && storedUser._id) {
      setUser(storedUser);
    }
  }, []);

  // Charger les infos utilisateur et commandes quand user est prêt
  useEffect(() => {
    if (user && user._id) {
      fetchUserById(user._id)
        .then((data) => {
          setUser(data);
          setForm({ name: data.name, email: data.email });
        })
        .catch(() => setError("Impossible de charger les informations utilisateur."));
      fetchOrdersById(user._id)
        .then((data) => {
          // data doit être un tableau de commandes pour cet utilisateur
          setOrders(Array.isArray(data) ? data : []);
        })
        .catch(() => setOrders([]));
    }
  }, [user]);

  // Gestion du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const updated = await updateUser(user._id, form);
      setUser(updated);
      setEditMode(false);
      setSuccess("Profil mis à jour !");
      // Mettre à jour le localStorage
      localStorage.setItem("user", JSON.stringify(updated));
    } catch (err) {
      setError(err.message || "Erreur lors de la mise à jour.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer votre compte ?")) return;
    try {
      await deleteUser(user._id);
      await logout();
      navigate("/register");
    } catch (err) {
      setError(err.message || "Erreur lors de la suppression.");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow text-center">
          <p>Vous devez être connecté pour accéder à votre profil.</p>
          <a href="/login" className="text-blue-600 hover:underline">Se connecter</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Mon Profil</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Informations utilisateur</h2>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          {success && <div className="mb-4 text-green-600">{success}</div>}
          {editMode ? (
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="name">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => {
                    setEditMode(false);
                    setForm({ name: user.name, email: user.email });
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p><span className="font-medium">Nom :</span> {user.name}</p>
              <p><span className="font-medium">Email :</span> {user.email}</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => setEditMode(true)}
                >
                  Modifier
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Supprimer le compte
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Mes commandes</h2>
          {orders.length === 0 ? (
            <p>Aucune commande trouvée.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li key={order._id} className="py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">Commande #{order._id}</span>
                      <span className="ml-2 text-gray-600">({order.status})</span>
                    </div>
                    <div>
                      <span className="text-gray-700">
                        Total : {order.totalAmount} €
                      </span>
                    </div>
                  </div>
                  {/* Affiche plus de détails si besoin */}
                  <div className="mt-2 text-sm text-gray-600">
                    {order.products && order.products.length > 0 && (
                      <ul>
                        {order.products.map((prod, idx) => (
                          <li key={idx}>
                            Produit : {prod.productId?.name || prod.productId} | Quantité : {prod.quantity}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Profil;