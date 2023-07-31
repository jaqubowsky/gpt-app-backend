const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const JWTExtract = passportJWT.ExtractJwt;
const User = require("../models/userModel.js");
const { JWT_SECRET, ALGORITHM } = require("./config.js");

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies["jwt"];
  }

  return jwt;
};

const options = {
  jwtFromRequest: JWTExtract.fromExtractors([cookieExtractor]),
  secretOrKey: JWT_SECRET,
  algorithms: [ALGORITHM],
};

module.exports = (passport) => {
  passport.use(
    new JWTStrategy(options, (payload, done) => {
      User.findById(payload.sub).then((user) => {
        if (user) {
          return done(null, {
            id: user._id,
            username: user.username,
            email: user.email,
          });
        } else {
          return done(null, false);
        }
      });
    })
  );
};
