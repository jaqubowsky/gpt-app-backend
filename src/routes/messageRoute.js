const express = require("express");
const router = express.Router();
const messageController = require("../controlers/messageController.js");

(async () => {
  const controller = await messageController();

  router.post("/:id", controller.create);
  router.get("/get", controller.get);
})();

module.exports = router;
