const mongoose = require("mongoose");

const treesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
  },
});

const treeSchema = mongoose.model("tree", treesSchema);
exports.treeSchema = treeSchema;
