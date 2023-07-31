const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, ALGORITHM } = require("../config/config.js");

function genPassword(password) {
  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(password, salt);

  return { hashedPassword, salt };
}

function validatePassword(pass, hash, salt) {
  const hashedPass = bcrypt.hashSync(pass, salt);

  return hashedPass === hash;
}

function issueJWT(user) {
  const id = user.id.toString();

  const expiresIn = "1d";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresIn,
    algorithm: ALGORITHM,
  });

  const expires = new Date(Date.now() + 86400000);

  return {
    token: signedToken,
    expires,
  };
}

module.exports = {
  genPassword,
  validatePassword,
  issueJWT,
};
