const express = require("express");

const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/", userController.index);
router.post("/new/", userController.create);
router.get("/:id/show", userController.show);
router.put("/:id/edit", userController.update);
router.delete("/:id/delete", userController.delete);

module.exports = router;
