const passport = require("passport");

function isAuthenticated(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, _) => {
    if (err || !user) {
      return res.status(200).json({ message: "Unauthorized", status: 401 });
    }
    req.user = user;

    return next();
  })(req, res, next);
}

module.exports = { isAuthenticated };
