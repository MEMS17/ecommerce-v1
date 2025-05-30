const express = require("express");

const router = express.Router();
const orderController = require("../controllers/ordersController");
const { authorize } = require("../middlewares/auth/authorizeRoles");

router.get("/", authorize(['admin']), orderController.index);
router.post("/new/", orderController.create);
router.get("/:id/show", orderController.show);
router.get("/:userId/view", orderController.view);// Get orders by user ID
router.put("/:id/edit", orderController.update);
router.delete("/:id/delete", orderController.delete);

module.exports = router;
