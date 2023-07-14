require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const treeRouter = require("./router/treeRouter");

const app = express();

//middleware
app.use("/api/treeStructure", treeRouter);

//DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log("listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
