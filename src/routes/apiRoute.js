const express = require("express");
const gptRoute = require("./gptRoute");
const userRoute = require("./userRoute");
const messageRoute = require("./messageRoute");
const roomRoute = require("./roomRoute");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const apiRouter = express.Router();

apiRouter.use("/user", userRoute);
apiRouter.use("/message", isAuthenticated, messageRoute);
apiRouter.use("/room", isAuthenticated, roomRoute);
apiRouter.use("/gpt", isAuthenticated, gptRoute);

module.exports = apiRouter;
