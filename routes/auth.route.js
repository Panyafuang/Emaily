const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    /** Being entirely managed by passport. */
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));
};
