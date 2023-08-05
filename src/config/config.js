const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const DB_PASS = process.env.DB_PASS;
const DB_LOGIN = process.env.DB_LOGIN;
const ALGORITHM = process.env.ALGORITHM;
const PORT = process.env.PORT;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ORGANIZATION_ID = process.env.OPENAI_ORGANIZATION_ID;
const PUSHER_APP_ID = process.env.PUSHER_APP_ID;
const PUSHER_KEY = process.env.PUSHER_KEY;
const PUSHER_SECRET = process.env.PUSHER_SECRET;

module.exports = {
  JWT_SECRET,
  DB_PASS,
  DB_LOGIN,
  ALGORITHM,
  PORT,
  OPENAI_API_KEY,
  OPENAI_ORGANIZATION_ID,
  PUSHER_APP_ID,
  PUSHER_KEY,
  PUSHER_SECRET,
};
