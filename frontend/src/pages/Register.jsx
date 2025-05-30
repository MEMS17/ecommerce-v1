import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!form.name || !form.email || !form.password) {
            setError("Tous les champs sont obligatoires.");
            return;
        }
        setLoading(true);
        try {
            await register(form);
            setLoading(false);
            navigate("/login");
        } catch (err) {
            setLoading(false);
            // Gestion des erreurs du backend (ex: email déjà utilisé)
            if (err.message && err.message.toLowerCase().includes("email")) {
                setError("Cet email est déjà utilisé.");
            } else {
                setError(err.message || "Erreur lors de l'inscription.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                    </a>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Entrez votre nom"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Entrez votre email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                    </div>
                    {error && (
                        <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Inscription..." : "S'inscrire"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
                    Déjà inscrit ? <a href="/login" className="text-blue-600 hover:underline">Se connecter</a>
                </p>
            </div>
        </div>
    );
};

export default Register;