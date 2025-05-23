

exports.index = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

exports.create = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};



exports.show = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};

exports.update = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};

exports.delete = async (req, res) => {
    try {
        

        
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};