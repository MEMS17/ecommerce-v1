const express = require("express");

const router = express.Router();
const userController = require("../controllers/usersController");
const { authenticate } = require("../middlewares/auth/verifyToken");
const { authorize } = require("../middlewares/auth/authorizeRoles");


router.get("/", userController.index);
router.post("/new/", authenticate, authorize(['admin']), userController.create);
router.get("/:id/show", userController.show);
router.put("/:id/edit", userController.update);
router.delete("/:id/delete", userController.delete);

module.exports = router;
