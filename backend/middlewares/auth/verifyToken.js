const jwt = require("jsonwebtoken");

// Vérifie si l'utilisateur est authentifié
exports.authenticate = (req, res, next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return res.status(403).json({ message: "Aucun token fourni" });
    }
    
    try {
        
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = {
            id: decodedAccessToken.id,
            role: decodedAccessToken.role
        };
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
            // Si le token est expiré ou invalide
            return res.status(401).json({ message: "Token expiré" });
        }
        
        return res.status(401).json({ message: "Token invalide" });
    }
};