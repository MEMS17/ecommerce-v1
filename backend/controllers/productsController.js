const productService = require("../services/productService");
const { uniqid } = require("../utils/referenceUtils");
const { saveFile } = require("../utils/fileUtils");



exports.index = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;
        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        const reference = uniqid("PROD");

        // Gestion de l'image
        let imageUrl = "";
        if (req.files && req.files.image) {
            const file = req.files.image;
            const fileName = reference;
            imageUrl = await saveFile(
                file,
                fileName,
                "images/products",
                [".jpg", ".jpeg", ".png", ".webp"],
                5 // 5 Mo
            );
            imageUrl = `images/products/${imageUrl}`;
        } else {
            return res.status(400).json({ message: "L'image du produit est requise" });
        }

        
        const product = await productService.createProduct({
            name,
            description,
            price,
            imageUrl,
            stock,
            category,
            reference
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};

exports.show = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};

exports.update = async (req, res) => {
    try {
        const productExist = await productService.getProductById(req.params.id);
        if (!productExist) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        
        const updateData = req.body;

        // Si une nouvelle image est envoyée
        if (req.files && req.files.image) {
            const file = req.files.image;
            const fileName = productExist.reference;
            let imageUrl = await saveFile(
                file,
                fileName,
                "images/products",
                [".jpg", ".jpeg", ".png", ".webp"],
                5
            );
            updateData.imageUrl =`images/products/${imageUrl}`;
        }

        const product = await productService.updateProduct(req.params.id, updateData);
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};

exports.delete = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.status(200).json({ message: "Produit supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};