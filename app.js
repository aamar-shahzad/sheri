const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { default: Product } = require("./models/Product");
const Serverport = process.env.PORT || 3000;
require("dotenv/config");
const cors = require("cors");
const AuthJwt = require("./helper/jwt");
const Handeler = require("./helper/error_handler");
///configration
const api = process.env.API_URL;
const db_connection = process.env.DATABAE_CONNECTION;

///middel ware

app.use(cors());
app.options("*", cors());
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(AuthJwt());
app.use(morgan("tiny"));
app.use(Handeler);
//routes
const productRouter = require("./routes/Products");
const orderRouter = require("./routes/Orders");
const categoryRouter = require("./routes/Categories");
const userRouter = require("./routes/Users");

app.use(`${api}/products`, productRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, userRouter);

//data base connection
mongoose
  .connect(db_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-db",
  })
  .then(() => {
    console.log("DataBase connection is ready....");
  })
  .catch((err) => {
    console.log(err);
  });
/////////server starting
app.listen(Serverport, () => {
  console.log(`eshop-app at http://localhost:${Serverport}`);
});
