const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { urlencoded, json } = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const apiRouter = require("./src/routes/apiRoute.js");
const passport = require("passport");
const {
  PORT,
  JWT_SECRET,
  DB_PASS,
  DB_LOGIN,
} = require("./src/config/config.js");
require("./src/config/passport.js")(passport);

const app = express();

const connect = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
  });
};

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://api.pusherapp.com/"],
    credentials: true,
  })
);
app.use(cookieParser(JWT_SECRET));
app.use(helmet());
app.use(passport.initialize());

app.use("/api", apiRouter);

connect(`mongodb+srv://${DB_LOGIN}:${DB_PASS}@gpt-app.9pdr4rk.mongodb.net/`)
  .then(async () => {
    app.listen(PORT);
    console.log(`Listening on port ${PORT}`);
  })
  .catch((e) => console.error(e));
