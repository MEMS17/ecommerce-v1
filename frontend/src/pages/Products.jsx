import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/imageUtils";
import { BASE_URL } from "../services/api";
import { fetchProductById } from "../services/productService";
import { createOrder } from "../services/orderService";
import { getCurrentUser } from "../services/authService";
import Navbar from "../includes/Navbar";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        setError("Erreur lors de la récupération du produit." + error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleOrder = async () => {
    setError("");
    setSuccess("");
    const user = getCurrentUser();
    if (!user || !user._id) {
      setError("Vous devez être connecté pour commander.");
      navigate("/login");
      return;
    }
    try {
      await createOrder({
        userId: user._id,
        products: [
          {
            productId: product._id,
            quantity: quantity
          }
        ],
        totalAmount: product.price * quantity
      });
      setSuccess("Commande passée avec succès !");
      setTimeout(() => navigate("/profil"), 1500);
    } catch (err) {
      setError(err.message || "Erreur lors de la commande.");
    }
  };

  if (!product) return <div>Chargement...</div>;

  return (
    <>
      <Navbar />
      <div className="mt-5 max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={getImageUrl(BASE_URL, product.imageUrl)}
            alt={product.name}
            className="w-full md:w-1/2 h-auto rounded-lg"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Catégorie : {product.category}</p>
            <p className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</p>

            <div className="flex items-center gap-4">
              <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
            </div>

            {error && <div className="text-red-600">{error}</div>}
            {success && <div className="text-green-600">{success}</div>}

            <button
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              onClick={handleOrder}
            >
              Commander
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;