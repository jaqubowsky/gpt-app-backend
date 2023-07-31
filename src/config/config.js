const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const DB_PASS = process.env.DB_PASS;
const DB_LOGIN = process.env.DB_LOGIN;
const ALGORITHM = process.env.ALGORITHM;
const PORT = process.env.PORT;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ORGANIZATION_ID = process.env.OPENAI_ORGANIZATION_ID;

module.exports = {
  JWT_SECRET,
  DB_PASS,
  DB_LOGIN,
  ALGORITHM,
  PORT,
  OPENAI_API_KEY,
  OPENAI_ORGANIZATION_ID,
};
