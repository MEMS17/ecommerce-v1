// routes/routes.js
const express = require("express");
const userRoutes = require("./users.routes");
const productRoutes = require("./products.routes");
const orderRoutes = require("./orders.routes");

const router = express.Router();
// Define the routes
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
