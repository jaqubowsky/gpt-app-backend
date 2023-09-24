const express = require("express");
const router = express.Router();
const messageController = require("../controlers/messageController.js");

router.post("/:id", messageController.createMessage);
router.get("/get", messageController.getUserMessages);

module.exports = router;
