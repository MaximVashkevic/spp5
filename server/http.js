const express = require("express");
const cookieParser = require("cookie-parser");
const authorizationMiddleware = require("./middlewares/authorizationMiddleware");
const cors = require("cors")
const http = require('http')
const {Server} = require('socket.io')

const jApp = require('./app')

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
