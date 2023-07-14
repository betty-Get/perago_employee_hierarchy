const mongoose = require("mongoose");

const treesSchema = new mongoose.Schema({
  name: {
    type: String,
    required,
  },
  description: {
    type: String,
    required,
  },
  parentId: {
    type: Number,
  },
});

const treeSchema = mongoose.model("tree", treesSchema);
exports.treeSchema = treeSchema;
