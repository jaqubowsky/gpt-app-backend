const express = require("express");
const gptRoute = require("./gptRoute");
const userRoute = require("./userRoute");

const apiRouter = express.Router();

apiRouter.use("/user", userRoute);
apiRouter.use("/gpt", gptRoute);

module.exports = apiRouter;
