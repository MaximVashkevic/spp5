const authorizationRule = require("../authorizedRoutes");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

function isValidToken(token) {
  if (!token) {
    return false
  }
  try {
    jwt.verify(token, jwtSecret)
    return true
  }
  catch (err) {
    console.log(err)
    return false
  }
}

function decodeToken(token) {
  if (!token) {
    return null
  }
  try {
    return jwt.verify(token, jwtSecret)
  }
  catch (err) {
    console.log(err)
    return null
  }
}

module.exports = (req, res, next) => {
  if (authorizationRule(req.path) && !isValidToken(req.cookies.jwt)) {
    res.status(401);
    res.set("WWW-Authenticate", "Bearer realm=jobbing.com");
    res.json({
      messages: [{type: "info", text:"Please login to access the site"}],
    });
  } else {
    req.userId = req.cookies.jwt ? decodeToken(req.cookies.jwt).id : undefined
    next();
  }
};
