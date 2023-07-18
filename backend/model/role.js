const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
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

const roleSchema = mongoose.model("role", rolesSchema);
exports.roleSchema = roleSchema;
