// Autorise l'accès à certaines routes en fonction du rôle de l'utilisateur
exports.authorize = (roles = []) => {
    
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès refusé" });
        }
        next();
    };
};