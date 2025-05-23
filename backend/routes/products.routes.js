const express = require("express");

const router = express.Router();
const productController = require("../controllers/productsController");

router.get("/", productController.index);
router.post("/new/", productController.create);
router.get("/:id/show", productController.show);
router.put("/:id/edit", productController.update);
router.delete("/:id/delete", productController.delete);

module.exports = router;
