const express = require("express");
const router = express.Router();
const userController = require("../controlers/userController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.get("/me", isAuthenticated, userController.getMe);
router.get("/rooms", isAuthenticated, userController.getUserRooms);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", isAuthenticated, userController.logout);
router.delete("/delete", isAuthenticated, userController.deleteAccount);
router.post("/leave/:id", isAuthenticated, userController.leaveRoom);

module.exports = router;
