const Product = require("../models/products");

exports.index = async (req, res) => {
    try {
        const products = await Product.find({});
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
        const product = new Product({
            name,
            description,
            price,
            imageUrl,
            stock,
            category,
            reference
        });
        await product.save();
        res.status(201).json(product);
        
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};



exports.show = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;

        await product.save();

        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        await product.deleteOne().exec();

        res.status(200).json({ message: "Produit supprimé avec succès" });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};
