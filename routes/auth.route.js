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

  app.get('/api/logout', (req, res) => {
    /**
     * req.logout is a function that is attached automatically to the request object by passport.
     */
    req.logout();
    res.send(req.user); // just prove to they are no longer signed in.
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
