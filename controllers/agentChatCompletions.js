const chatCompletions = require("./agentController");

async function agentChatCompletions(
  agentName,
  toolDefs,
  instructions,
  tools,
  userMessage
) {
  const model = "meta-llama/llama-3.2-3b-instruct:free";
  let countExec = 0;
  const toolsUse = toolDefs?.length
    ? toolDefs.map((fn) => ({ type: "function", function: fn }))
    : undefined;
  const parsedMessage = {
    call_reason: "call_function",
    user_message: userMessage.toLowerCase(),
  };

  let response, assistantResponse, finishReason, parseResponse;
  let conversation = [
    {
      role: "system",
      content: instructions + "\nTools : " + JSON.stringify(toolsUse),
    },
    { role: "user", content: JSON.stringify(parsedMessage) },
  ];

  console.log(
    `\n ---- Agent ${agentName} called with conversation: ${conversation} --- \n`
  );

  do {
    countExec++;
    const body = {
      model,
      max_tokens: 2000,
      temperature: 0.5,
      top_p: 0.1,
      messages: conversation,
    };

    response = await chatCompletions(body);
    assistantResponse = response.choices[0].message.content.trim();
    console.log("Assistant Response:", assistantResponse);

    try {
      parseResponse = JSON.parse(assistantResponse);
      finishReason = parseResponse.finish_reason;
      console.log("Finish Reason:", finishReason);
    } catch (error) {
      console.error("Error parsing response:", error);
      break;
    }

    if (finishReason === "tool_calls") {
      const functions = parseResponse.functions;
      if (!functions)
        throw createHttpError(500, "No tool calls found in the LLM response");

      for (const tool of functions) {
        const toolName = tool.name;
        const toolArgs = tool.args;

        console.log("Calling tool:", toolName, "with arguments:", toolArgs);

        let parsedSection;
        try {
          parsedSection =
            typeof toolArgs.sections === "string" ||
            typeof toolArgs.section === "string"
              ? JSON.parse(toolArgs.sections || toolArgs.section)
              : toolArgs.sections || toolArgs.section;

          if (Array.isArray(parsedSection)) {
            toolArgs = parsedSection;
          } else {
            toolArgs = [toolArgs.section];
          }
        } catch (e) {
          toolArgs = [toolArgs.section];
        }

        const toolToCall = tools[toolName];
        try {
          const toolResponse = await toolToCall(toolArgs);
          console.log("Tool response:", toolResponse);

          conversation = [
            { role: "system", content: instructions },
            {
              role: "user",
              content: JSON.stringify({
                call_reason: "relay_response",
                user_message: userMessage,
                function_response: JSON.stringify(toolResponse),
              }),
            },
          ];
        } catch (error) {
          console.error(`Error executing tool ${toolName}:`, error);

          conversation.push({
            role: "system",
            content: JSON.stringify({
              call_reason: "relay_response",
              function_response: `Error executing tool ${toolName}: ${error.message}`,
            }),
          });
        }
      }
    }
  } while (finishReason === "tool_calls" && countExec < 10);

  console.log("-----------------------------------");
  console.log("Response from", agentName, ":", assistantResponse);
  console.log("Finish Reason:", finishReason);
  console.log("Execution Count:", countExec);
  console.log("-----------------------------------");

  return {
    parseResponse,
    usage: response?.usage,
    response,
    countExec,
  };
}

module.exports = agentChatCompletions;
