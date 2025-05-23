const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

function generateToken(user) {
    return jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
    );
}

exports.register = async ({ name, email, password }) => {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        return { success: false, message: "Cet email est déjà utilisé" };
    }
    // Créer l'utilisateur
    const user = await userRepository.create({ name, email, password });
    const userObj = user.toObject();
    delete userObj.password;
    const token = generateToken(user);
    return { success: true, user: userObj, token };
};

exports.login = async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        return { success: false, message: "Email ou mot de passe incorrect" };
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return { success: false, message: "Email ou mot de passe incorrect" };
    }
    const userObj = user.toObject();
    delete userObj.password;
    const token = generateToken(user);
    return { success: true, user: userObj, token };
};