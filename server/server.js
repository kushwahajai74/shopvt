const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const dbConnection = require("./config/database");

//Handling uncought exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to Uncaught Exception ");
  process.exit(1);
});

//config
dotenv.config({ path: "server/config/config.env" });

dbConnection();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `🚀 Server is up and working on http://localhost:${process.env.PORT}`
  );
});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
