const express = require("express");
const router = express.Router();
const roomController = require("../controlers/roomController");

router.post("/create", roomController.createRoom);
router.get("/messages/:id", roomController.getRoomMessages);
router.post("/add/:id", roomController.addUserToRoom);

module.exports = router;
