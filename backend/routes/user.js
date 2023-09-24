const userController = require("../controllers/userAuth");
const express = require("express");
const verifyToken = require("../middeware/verifyToken");
const verifyAdmin = require("../middeware/verifyAdmin");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", verifyToken, userController.getUser);
router.put("/address", verifyToken, userController.updateAddress);
router.post("/refreshAccessToken", userController.refreshAccessTokenUser);
router.get("/users", [verifyToken, verifyAdmin], userController.getAllUsers);
router.put("/cart/:pid", [verifyToken], userController.cartUser);
router.delete("/:id", [verifyToken, verifyAdmin], userController.deleteUser);
router.put("/update", [verifyToken], userController.updateUser);

module.exports = router;
