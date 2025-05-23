const Order = require("../models/orders");

exports.index = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId').populate('products.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

exports.create = async (req, res) => {
    try {
        const { userId, products, totalAmount, status } = req.body;

        if (!userId || !products || !Array.isArray(products) || products.length === 0 || !totalAmount) {
            return res.status(400).json({ message: "Tous les champs sont requis (userId, products[], totalAmount)" });
        }

        // Vérification des produits et quantités
        for (const item of products) {
            if (!item.productId || !item.quantity) {
                return res.status(400).json({ message: "Chaque produit doit avoir productId et quantity" });
            }
        }

        const newOrder = new Order({
            userId,
            products,
            totalAmount,
            status: status || 'pending'
        });

        await newOrder.save();
        res.status(201).json(newOrder);

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};

exports.show = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId').populate('products.productId');
        if (!order) {
            return res.status(404).json({ message: "Order non trouvé" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { products, totalAmount, status } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order non trouvé" });
        }

        if (products) order.products = products;
        if (totalAmount) order.totalAmount = totalAmount;
        if (status) order.status = status;

        await order.save();
        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order non trouvé" });
        }
        await order.deleteOne();
        res.status(200).json({ message: "Order supprimé avec succès" });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message || error
        });
    }
};