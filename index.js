const express = require("express");
const app = express();
const db = require("./config/mongoose");
const port = 8000;


// body parser for req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// use express router
app.use("/", require("./routes"));

//Server Listner
app.listen(port, function(err) {
  if (err) {
    console.log("Error Running the Server", err);
  }
  console.log("Server Running on Port: ", port);
});