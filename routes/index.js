const express = require("express");
const agentSystem = require("../agents/synAI/index");
const router = express.Router();

router.post("/agent", async (req, res) => {
  try {
    const { input } = req.body;
    const response = await agentSystem(input);
    if (!res.headersSent) {
      console.log("\n ----------> seding back a response \n ________________________")
      return res.json(response.response);
    }
  } catch (error) {
    console.error("Error:", error);
    if (!res.headersSent) {
      console.error("---- Sending error response ----");
      res.status(500).json({ error: "Failed to process request" });
    }
  }
});

module.exports = router;
