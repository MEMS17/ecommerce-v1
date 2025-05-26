const productRepository = require("../repositories/productRepository");

exports.getAllProducts = () => productRepository.findAll();
exports.getProductById = (id) => productRepository.findById(id);
exports.createProduct = (data) => productRepository.create(data);
exports.updateProduct = (id, data) => productRepository.update(id, data);
exports.deleteProduct = (id) => productRepository.delete(id);