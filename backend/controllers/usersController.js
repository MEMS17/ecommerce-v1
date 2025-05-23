const User = require("../models/users");

exports.index = async (req, res) => {
    try {
        const users = await User.find({});
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

        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();

        // Ne pas renvoyer le mot de passe dans la réponse
        const userToReturn = newUser.toObject();
        delete userToReturn.password;

        res.status(201).json(userToReturn);
        
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};



exports.show = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Ne pas renvoyer le mot de passe dans la réponse
        const userToReturn = user.toObject();
        delete userToReturn.password;

        res.status(200).json(userToReturn);
        
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        user.name = name || user.name;
        user.role = role || user.role;
        user.email = email || user.email;
        user.password = password || user.password;

        await user.save();

        // Ne pas renvoyer le mot de passe dans la réponse
        const userToReturn = user.toObject();
        delete userToReturn.password;

        res.status(200).json(userToReturn);
        
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};
