const { toolDefs, tools } = require("./tools");
const agentChatCompletions = require("../../controllers/agentChatCompletions");
const { instructions } = require("./instructions");
async function agentSystem(userMessage) {
  const resp = await agentChatCompletions(
    "SynAI",
    toolDefs,
    instructions(),
    tools,
    userMessage.toLowerCase()
  );
  return resp.parseResponse;
}

console.log(agentSystem("who is omar? and where does he work currently?"));
module.exports = agentSystem;
