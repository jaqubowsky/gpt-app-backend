const express = require("express");
const router = express.Router();
const roomController = require("../controlers/roomController");

(async () => {
  const controller = await roomController();

  router.post("/create", controller.create);
  router.get("/messages/:id", controller.getMessages);
  router.post("/add/:id", controller.addUser);
})();

module.exports = router;
