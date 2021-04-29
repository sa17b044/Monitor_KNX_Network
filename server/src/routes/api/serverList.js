const { Router } = require("express");
const router = Router();
const Server_Model = require("../../../src/models/server_schema");
router.get("/", async (req, res) => {
  try {
    const serverList = await Server_Model.find();
    if (!serverList) throw new Error("No item List");
    const stored = serverList.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(stored);
    console.log(req.body);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.post("/", async (req, res) => {
  console.log(req.body);
  const newserverList = new Server_Model(req.body);
  
  try {
    const serverList = await newserverList.save();
    if (!serverList) throw new Error("wrong saving");
    res.status(200).json(serverList);
    console.log(req.body);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Server_Model.findByIdAndUpdate(id, req.body);
    console.log(response)
    if (!response) throw new Error("wrong updating");
    const updated = { ...response._doc, ...req.body };
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const removed  = await Server_Model.findByIdAndDelete(id);
    console.log(removed)
    if (!removed) throw Error('Something went wrong ')
    res.status(200).json(removed)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
