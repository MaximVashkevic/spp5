const authorizationRule = require("../authorizedRoutes");

module.exports = (req, res, next) => {
  if (authorizationRule(req.path) && !(req.cookies && req.cookies.userId)) {
    res.status(401);
    res.set("WWW-Authenticate", "Bearer realm=jobbing.com");
    res.json({
      errors: ["Please login to access the site"],
    });
  } else {
    req.userId = req.cookies.userId;
    next();
  }
};
