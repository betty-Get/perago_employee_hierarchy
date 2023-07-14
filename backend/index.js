require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const treeRouter = require("./router/treeRouter");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//middleware
app.use("/api/treeStructure", treeRouter);

//DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("listening on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
