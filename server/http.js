const express = require("express");
const cookieParser = require("cookie-parser");
const authorizationMiddleware = require("./middlewares/authorizationMiddleware");
const cors = require("cors")

const stockRouter = require("./routers/stockRouter");
const mainRouter = require("./routers/mainRouter");

(async () => {
  const server = express();
  const corsOptions = {
    origin: 'http://localhost:63342',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  server.options('*', cors(corsOptions))
  server.use(cors(corsOptions))
  server.use(express.json())
  server.use(cookieParser());

  server.use(authorizationMiddleware);

  server.use("/", mainRouter);
  server.use("/stock", stockRouter);

  server.listen(3000, () => console.log("listening"));
})();