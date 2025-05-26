const userService = require("../services/userService");

exports.index = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }
        const newUser = await userService.createUser({ name, email, password });
        const userToReturn = newUser.toObject();
        delete userToReturn.password;
        res.status(201).json(userToReturn);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};

exports.show = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        const userToReturn = user.toObject();
        delete userToReturn.password;
        res.status(200).json(userToReturn);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        user.name = name || user.name;
        user.role = role || user.role;
        user.email = email || user.email;
        user.password = password || user.password;
        await user.save();
        const userToReturn = user.toObject();
        delete userToReturn.password;
        res.status(200).json(userToReturn);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};

exports.delete = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        await userService.deleteUser(req.params.id);
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};