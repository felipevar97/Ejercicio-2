const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
// Controllers
const renderController = require("./controllers/renderController");
const productsController = require("./controllers/productsController");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database ready!");
  })
  .catch((error) => {
    console.error(error);
  });

app.use(renderController);
app.use(productsController);

module.exports = app;
