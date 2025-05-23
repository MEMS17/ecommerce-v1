const orderService = require("../services/orderService");

exports.index = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
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
        for (const item of products) {
            if (!item.productId || !item.quantity) {
                return res.status(400).json({ message: "Chaque produit doit avoir productId et quantity" });
            }
        }
        const order = await orderService.createOrder({
            userId, products, totalAmount, status: status || 'pending'
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};

exports.show = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order non trouvé" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};

exports.update = async (req, res) => {
    try {
        const updateData = req.body;
        const order = await orderService.updateOrder(req.params.id, updateData);
        if (!order) {
            return res.status(404).json({ message: "Order non trouvé" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};

exports.delete = async (req, res) => {
    try {
        const order = await orderService.deleteOrder(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order non trouvé" });
        }
        res.status(200).json({ message: "Order supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message || error });
    }
};