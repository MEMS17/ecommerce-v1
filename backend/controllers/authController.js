const authService = require("../services/authService");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        const result = await authService.register({ name, email, password });
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        res.status(201).json({ user: result.user, token: result.token });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }
        const result = await authService.login({ email, password });
        if (!result.success) {
            return res.status(401).json({ message: result.message });
        }
        res.status(200).json({ user: result.user, token: result.token });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};

exports.logout = (req, res) => {
    // Pour un JWT, le logout côté serveur consiste à demander au client de supprimer le token
    res.status(200).json({ message: "Déconnexion réussie, supprimez le token côté client." });
};