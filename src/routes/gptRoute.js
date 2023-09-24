const express = require("express");
const router = express.Router();

const gptController = require("../controlers/gptController");

router.post("/image/new", gptController.generateImage);

module.exports = router;
