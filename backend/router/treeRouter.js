const { roleSchema } = require("../model/role");
const express = require("express");

const router = express.Router();

//post trees
router.post("/", async (req, res) => {
  try {
    const { name, description, parentId } = req.body;

    const parent = await roleSchema.create({ name, description, parentId });
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//get all trees
router.get("/", async (req, res) => {
  try {
    const trees = await roleSchema.find();
    res.status(200).json(trees);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//get single role ... employee-roles
router.get("/:roleId", async (req, res) => {
  const { roleId } = req.params;

  try {
    const role = await roleSchema.findById({ _id: roleId });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//update trees
router.patch("/:roleId", async (req, res) => {
  const { roleId } = req.params;
  const { name, description } = req.body;
  try {
    const updated = await roleSchema.findByIdAndUpdate(
      { _id: roleId },
      { name, description },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//remove trees
router.delete("/:roleId", async (req, res) => {
  const { roleId } = req.params;
  try {
    const deleted = await roleSchema.findByIdAndRemove({ _id: roleId });
    res.status(200).json({ mssg: "deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
