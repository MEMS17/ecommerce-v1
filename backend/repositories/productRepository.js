const Product = require("../models/products");

exports.findAll = () => Product.find({});
exports.findById = (id) => Product.findById(id);
exports.create = (data) => new Product(data).save();
exports.update = (id, data) => Product.findByIdAndUpdate(id, data, { new: true });
exports.delete = (id) => Product.findByIdAndDelete(id);