const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/authMiddleware");
const gptController = require("../controlers/gptController");

(async () => {
  const controller = await gptController();

  router.post("/image", isAuthenticated, controller.image);
})();

module.exports = router;
