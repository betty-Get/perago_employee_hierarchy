const { treeSchema } = require("../model/tree");
const express = require("express");

const router = express.Router();

//post trees
router.post =
  ("/addTree",
  async (req, res) => {
    // const parentId = req.params;
    const { name, description } = req.body;
    try {
      const parent = await treeSchema.create({ name, description });
      return res.status(200).json(parent);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });

//get all trees
router.get("/allTrees", async (req, res) => {
  try {
    const trees = await treeSchema.find();
    res.status(200).json(trees);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//update trees
router.patch("/updateTree/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updated = await treeSchema.findByIdAndUpdate(
      { _id: id },
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
router.delete("/deleteTree/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await treeSchema.findByIdAndRemove({ _id: id });
    res.status(200).json({ mssg: "deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
