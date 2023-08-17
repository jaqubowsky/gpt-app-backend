const express = require("express");
const router = express.Router();
const userController = require("../controlers/userController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

(async () => {
  const controller = await userController();

  router.get("/me", isAuthenticated, controller.getMe);
  router.get("/rooms", isAuthenticated, controller.getRooms)
  router.post("/register", controller.signup);
  router.post("/login", controller.login);
  router.post("/logout", isAuthenticated, controller.logout);
  router.delete("/delete", isAuthenticated, controller.deleteAccount);
  router.post("/leave/:id", isAuthenticated, controller.leave);
})();

module.exports = router;
