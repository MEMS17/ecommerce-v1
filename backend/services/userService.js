const userRepository = require("../repositories/userRepository");

exports.getAllUsers = () => userRepository.findAll();
exports.getUserById = (id) => userRepository.findById(id);
exports.getUserByEmail = (email) => userRepository.findByEmail(email);
exports.createUser = (userData) => userRepository.create(userData);
exports.updateUser = (id, updateData) => userRepository.update(id, updateData);
exports.deleteUser = (id) => userRepository.delete(id);