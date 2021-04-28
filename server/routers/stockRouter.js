const { Router } = require("express");
const app = require("../app");

const stockRouter = new Router();

stockRouter.get("/search", async (req, res) => {
  const query = req.query.query;
  let results = await app.then((app) => app.search(query));
  if (results.results.length === 0)
  {
    results.messages = [{type: 'info', message: 'No results found'}]
  }
  res.json(results);
});

stockRouter.get("/:symbol", async (req, res) => {
  let symbol = req.params.symbol;
  let info = await app.then((app) =>
    app.getStockInfo(symbol, req.userId)
  );
  res.json(info)
});

stockRouter.post("/buy", async (req, res) => {
  console.log(req)
  const symbol = req.body.symbol;
  const amount = req.body.amount;
  await app
    .then((app) => app.buy({ symbol, amount, userId: req.userId }))
    .then(() => {
      res.status(200)
      .json({ messages: [{type: 'success', text: "Shares were bought successfully"}] })
      res.send();
    })
    .catch((err) => {
      console.log(err)
      res.status(422);
      res.json({ messages: [{type: 'danger', text: "Can't buy shares"}] });
    });
});

stockRouter.post("/sell", async (req, res) => {
  const symbol = req.body.symbol;
  const amount = req.body.amount;
  await app
    .then((app) => app.sell({ symbol, amount, userId: req.userId }))
    .then(() => {
      res.status(200)
      .json({ messages: [{type: 'success', text: "Shares were sold successfully"}] })
      res.send();
    })
    .catch(() => {
      res.status(422);
      res.json({ messages: [{type: 'danger', text: "Can't sell shares"}] });
    });
});

module.exports = stockRouter;
