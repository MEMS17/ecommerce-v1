const Order = require("../models/orders");

exports.findAll = () => Order.find({}).populate('userId').populate('products.productId');
exports.findById = (id) => Order.findById(id).populate('userId').populate('products.productId');
exports.create = (data) => new Order(data).save();
exports.update = (id, data) => Order.findByIdAndUpdate(id, data, { new: true });
exports.delete = (id) => Order.findByIdAndDelete(id);