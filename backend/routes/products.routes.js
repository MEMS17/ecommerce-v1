const express = require("express");

const router = express.Router();
const productController = require("../controllers/productsController");
const { authenticate } = require("../middlewares/auth/verifyToken");
const { authorize } = require("../middlewares/auth/authorizeRoles");


router.get("/", productController.index);
router.post("/new/", authenticate, authorize(['admin']), productController.create);
router.get("/:id/show", productController.show);
router.put("/:id/edit", authenticate, authorize(['admin']), productController.update);
router.delete("/:id/delete", authenticate, authorize(['admin']), productController.delete);

module.exports = router;
