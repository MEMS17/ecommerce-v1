import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("tableauDeBord");
  const navigate = useNavigate();

  // Données statiques exemples (à remplacer par données réelles / API)
  const stats = {
    utilisateursActifs: 1234,
    commandesTraitees: 567,
    chiffreAffaires: "12 345 €",
    nouveauxProduits: 15,
  };

  const recentActivities = [
    { id: 1, texte: "Utilisateur Jean Dupont enregistré", date: "Il y a 2 heures" },
    { id: 2, texte: "Commande #1234 terminée", date: "Il y a 5 heures" },
    { id: 3, texte: "Nouveau produit ajouté : Sneakers", date: "Il y a 1 jour" },
  ];

  const handleLogout = () => {
    // Ici tu peux nettoyer les données de session (localStorage, cookies, etc.)
    // Exemple : localStorage.removeItem("token");
    navigate("/admin/Login"); // redirection vers la page signup
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "tableauDeBord":
        return (
          <>
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded shadow p-6">
                <h2 className="text-xl font-semibold mb-2">Utilisateurs actifs</h2>
                <p className="text-3xl font-bold text-blue-600">{stats.utilisateursActifs}</p>
                <p className="text-gray-500">Ce mois-ci</p>
              </div>
              <div className="bg-white rounded shadow p-6">
                <h2 className="text-xl font-semibold mb-2">Commandes traitées</h2>
                <p className="text-3xl font-bold text-blue-600">{stats.commandesTraitees}</p>
                <p className="text-gray-500">Ce mois-ci</p>
              </div>
              <div className="bg-white rounded shadow p-6">
                <h2 className="text-xl font-semibold mb-2">Chiffre d'affaires</h2>
                <p className="text-3xl font-bold text-blue-600">{stats.chiffreAffaires}</p>
                <p className="text-gray-500">Ce mois-ci</p>
              </div>
              <div className="bg-white rounded shadow p-6">
                <h2 className="text-xl font-semibold mb-2">Nouveaux produits</h2>
                <p className="text-3xl font-bold text-blue-600">{stats.nouveauxProduits}</p>
                <p className="text-gray-500">Ajoutés récemment</p>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Activité récente</h2>
              <ul className="bg-white rounded shadow divide-y divide-gray-200">
                {recentActivities.map((item) => (
                  <li key={item.id} className="p-4 flex justify-between">
                    <span>{item.texte}</span>
                    <time className="text-gray-400 text-sm">{item.date}</time>
                  </li>
                ))}
              </ul>
            </section>
          </>
        );

      case "utilisateurs":
        return (
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Gestion des utilisateurs</h2>
            <p>Liste des utilisateurs avec options de recherche, filtres et actions.</p>
            {/* Ici tu pourrais intégrer un tableau ou une API pour gérer les utilisateurs */}
          </div>
        );

      case "commandes":
        return (
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Gestion des commandes</h2>
            <p>Liste des commandes avec statuts, recherche et détails.</p>
            {/* Intègre ici la liste des commandes */}
          </div>
        );

      case "produits":
        return (
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Gestion des produits</h2>
            <p>Catalogue produit, ajout, modification, suppression.</p>
            {/* Intègre ici la gestion des produits */}
          </div>
        );

      case "parametres":
        return (
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Paramètres & configurations</h2>
            <p>Gestion des rôles, modes de paiement, livraison, etc.</p>
            {/* Section paramètres */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barre latérale */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-2xl font-bold text-blue-600 border-b border-gray-200">
          Panneau Admin
        </div>
        <nav className="mt-6">
          <ul>
            <li
              onClick={() => setActiveMenu("tableauDeBord")}
              className={`px-6 py-3 cursor-pointer font-semibold ${
                activeMenu === "tableauDeBord"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              Tableau de bord
            </li>
            <li
              onClick={() => setActiveMenu("utilisateurs")}
              className={`px-6 py-3 cursor-pointer ${
                activeMenu === "utilisateurs"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-blue-50"
              }`}
            >
              Utilisateurs
            </li>
            <li
              onClick={() => setActiveMenu("commandes")}
              className={`px-6 py-3 cursor-pointer ${
                activeMenu === "commandes"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-blue-50"
              }`}
            >
              Commandes
            </li>
            <li
              onClick={() => setActiveMenu("produits")}
              className={`px-6 py-3 cursor-pointer ${
                activeMenu === "produits"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-blue-50"
              }`}
            >
              Produits
            </li>
            <li
              onClick={() => setActiveMenu("parametres")}
              className={`px-6 py-3 cursor-pointer ${
                activeMenu === "parametres"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-blue-50"
              }`}
            >
              Paramètres
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeMenu === "tableauDeBord"
              ? "Tableau de bord"
              : activeMenu === "utilisateurs"
              ? "Gestion des utilisateurs"
              : activeMenu === "commandes"
              ? "Gestion des commandes"
              : activeMenu === "produits"
              ? "Gestion des produits"
              : activeMenu === "parametres"
              ? "Paramètres"
              : ""}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-black-600 text-black px-4 py-2 rounded hover:bg-black-700"
          >
            Se déconnecter
          </button>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;