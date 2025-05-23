const orderRepository = require("../repositories/orderRepository");

exports.getAllOrders = () => orderRepository.findAll();
exports.getOrderById = (id) => orderRepository.findById(id);
exports.createOrder = (data) => orderRepository.create(data);
exports.updateOrder = (id, data) => orderRepository.update(id, data);
exports.deleteOrder = (id) => orderRepository.delete(id);