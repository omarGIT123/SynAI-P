const dataRetrieval = require("../dataRetrievalAgent/index");

const toolDefs = [
  {
    name: "sendEmail",
    description: "Sends an email",
    parameters: {
      type: "object",
      properties: {
        sender: {
          type: "string",
          description: "Email of the sender",
        },
        content: {
          type: "string",
          description: "Content of the email",
        },
      },
      required: ["sender", "content"],
    },
  },
  {
    name: "dataRetrieval",
    description:
      "Fetches information about specific topics to answer the user's request",
    parameters: {
      type: "object",
      properties: {
        sections: {
          type: "array",
          description:
            "list of sections of the portfolio the user is asking for information about",
        },
      },
      required: ["section"],
    },
  },
];

function sendEmail({ sender, content }) {
  return 0;
}

const tools = { dataRetrieval, sendEmail };

module.exports = { toolDefs, tools };
