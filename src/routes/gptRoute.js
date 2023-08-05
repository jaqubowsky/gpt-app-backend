const express = require("express");
const router = express.Router();

const gptController = require("../controlers/gptController");

(async () => {
  const controller = await gptController();

  router.post("/image", controller.image);
})();

module.exports = router;
