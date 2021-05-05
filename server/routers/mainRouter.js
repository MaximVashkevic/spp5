const { Router } = require("express");
const bodyParser = require("body-parser");
const app = require("../app");
const ValidationError = require("../validationError");
const { jwtSecret, jwtCookieKey } = require("../config");
const jwt = require("jsonwebtoken")

const router = new Router();

// TODO: necessary?
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});
router.use(urlencodedParser);

router.get("/history", async (req, res) => {
  const history = await app.then((app) =>
    app.history(req.userId)
  );
  const transactions = history.map((transaction) => {
    return {
      symbol: transaction.Symbol.symbol,
      name: transaction.Symbol.companyName,
      shares: transaction.shares,
      price: transaction.price,
      total: transaction.price * transaction.shares,
      time: transaction.time,
    };
  });
  res.json(transactions);
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  await app
    .then((app) => app.logIn({ login, password }))
    .then((result) => {
      const jwtToken = jwt.sign({id: result.id}, jwtSecret, {expiresIn: "900000" })
      res
        .cookie(jwtCookieKey, jwtToken, {maxAge: 900000, httpOnly: true, secure: true, sameSite: 'None'})
        .cookie('id', result.id, {maxAge: 900000})
        .send()
    })
    .catch((err) => {
      res.status(401);
      res.set("WWW-Authenticate", "Bearer realm=jobbing.com");
      res.json({
        messages: [{ type: 'danger', text: err.message}],
      });
    });
});

router.post("/register", urlencodedParser, async (req, res) => {
  const { login, password, password_confirm } = req.body;

  await app
    .then((app) =>
      app.register({
        login: login,
        password: password,
        password_confirmation: password_confirm,
      })
    )
    .then(() => {
      res.status(200)
      .json({
        messages: [
          {
            type: 'success',
            text: 'User was created successfully'
          }
        ]
      })
      res.send();
    })
    .catch((err) => {
      let messages = [];
      if (err instanceof ValidationError) {
        messages = err.messages.map(message => ({type: 'danger', text: message}))
      } else {
        messages.push({type: 'danger', text: err.message});
      }
      res.status(422);
      res.json({
        messages: messages,
      });
    });
});

router.delete("/logout", async (req, res) => {
  if (req.userId) {
    res.status(401)
    .clearCookie(jwtCookieKey)
    .clearCookie('id')
    .send()
  }
  else {
    res.status(401).send()
  }
})

module.exports = router;
