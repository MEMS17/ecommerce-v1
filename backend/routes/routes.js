// routes/routes.js
const express = require("express");
const userRoutes = require("./users.routes");
const productRoutes = require("./products.routes");
const orderRoutes = require("./orders.routes");
const authRoutes = require("./auth.routes");
const { authenticate } = require("../middlewares/auth/verifyToken");


const router = express.Router();
// Define the routes
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/orders", authenticate, orderRoutes);

module.exports = router;
