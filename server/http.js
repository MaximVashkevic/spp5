const express = require("express");
const cookieParser = require("cookie-parser");
const authorizationMiddleware = require("./middlewares/authorizationMiddleware");
const cors = require("cors")
const http = require('http')
const {Server} = require('socket.io')

const jApp = require('./app')

const {graphql, buildSchema} = require('graphql')

const schema = buildSchema(`
  type TransactionInfo {
    symbol: String!
    name: String!
    shares: Int!
    price: Float!
    total: Float!
    time: Float!
  }

  type Query {
    transactions(userId: Int!): [TransactionInfo]
  }
`)

const root = {
  transactions: async ({userId}) => {
    const history = await jApp.then((app) =>
      app.history(userId)
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
    return transactions
  }
}


const stockRouter = require("./routers/stockRouter");
const mainRouter = require("./routers/mainRouter");


  const corsOptions = {
    origin: 'http://localhost:63342',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  const options = {
    cors: corsOptions
  }

  const app = express();
  const server = http.createServer(options, app)
  
  const io = new Server(server, options)

  io.on('connection', (socket) => {
    console.log("connected to io!!!")
    const id = socket.handshake.auth.token
    socket.on('info', async (message, callback) => {
      const allTransactions = await jApp.then((app) =>
        app.info({ userId: id })
      );
      const total = await jApp.then((app) => app.currentCash(id)).catch(err => console.log(err));
      response = {
        total: total.toFixed(2),
        transactions: allTransactions,
      }
      callback(response)
    })

    socket.on('history', async (message, callback) => {
      console.log(message.variables)
      const variables = {
        id: +message.variables.id
      }
      const query = message.query
      const result = await graphql(schema, query, root, null, variables)
      console.log(JSON.stringify(result))
      callback(result.data.transactions);
    })

    socket.on('disconnect', () => {
      console.log("disconnect")
    })
  })

  app.options('*', cors(corsOptions))
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(cookieParser());

  app.use(authorizationMiddleware);

  app.use("/", mainRouter);
  app.use("/stock", stockRouter);

  server.listen(3000, () => console.log("listening"));
