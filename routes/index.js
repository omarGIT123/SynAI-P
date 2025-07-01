const express = require("express");
const agentSystem = require("../agents/synAI/index");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { input } = req.body;
    const response = await agentSystem(input);
    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

module.exports = router;
