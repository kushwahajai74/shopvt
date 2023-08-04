const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const path = require("path");

//config

dotenv.config({ path: "config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload({ useTempFiles: true }));

//Route Imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");

// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://64a67151a702eb4f684cbdba--sensational-cendol-e260ad.netlify.app"
//   ); // update to match the domain you will make the request from

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
// });
if (process.env.NODE_ENV === "production") {
  //   const path = require("path");
  app.use(express.static(path.resolve(__dirname, "client", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "dist", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

//Middleware for error
app.use(errorMiddleware);
module.exports = app;
