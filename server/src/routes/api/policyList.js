const { Router } = require("express");
const Policy_Model = require("../../../src/models/policy_schema");
const router = Router();
router.get("/", async (req, res) => {
  try {
    const policyList = await Policy_Model.find();
    if (!policyList) throw new Error("No item List");
    const stored = policyList.sort((a, b) => {
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
  console.log(typeof(req.body.services))
  const newPolicy = new Policy_Model(req.body);
  try {
    const policyList = await newPolicy.save();
    console.log("#", policyList);
    if (!policyList) throw new Error("wrong saving");
    res.status(200).json(policyList);
    console.log(req.body);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    console.log('#',error);
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Policy_Model.findByIdAndUpdate(id, req.body);
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
    const removed  = await Policy_Model.findByIdAndDelete(id);
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
