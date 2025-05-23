const User = require("../models/users");

exports.findAll = () => User.find({});
exports.findById = (id) => User.findById(id);
exports.findByEmail = (email) => User.findOne({ email });
exports.create = (userData) => new User(userData).save();
exports.update = (id, updateData) => User.findByIdAndUpdate(id, updateData, { new: true });
exports.delete = (id) => User.findByIdAndDelete(id);