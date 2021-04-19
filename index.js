const express = require("express");
var cors = require("cors");
const app = express();
const db = require("./config/mongoose");
const port = process.env.port || 8000;

//use cros
app.use(cors());

// body parser for req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use express router
app.use("/", require("./routes"));

//Server Listner
app.listen(port, function (err) {
  if (err) {
    console.log("Error Running the Server", err);
  }
  console.log("Server Running on Port: ", port);
});
