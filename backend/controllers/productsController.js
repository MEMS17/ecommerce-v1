const productService = require("../services/productService");

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
        const { name, description, price, imageUrl, stock, category, reference } = req.body;
        if (!name || !description || !price || !imageUrl || !stock || !category || !reference) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        const product = await productService.createProduct({
            name, description, price, imageUrl, stock, category, reference
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
        const updateData = req.body;
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