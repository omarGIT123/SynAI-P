const chatCompletions = require("./agentController");

async function agentChatCompletions(
  agentName,
  toolDefs,
  instructions,
  tools,
  userMessage
) {
  let countExec = 0;
  const model = "mistralai/mistral-small-3.2-24b-instruct:free";

  const toolsUse = toolDefs?.length
    ? toolDefs.map((fn) => ({ type: "function", function: fn }))
    : undefined;
  const parsedMessage = {
    call_reason: "call_function",
    user_message: userMessage.toLowerCase(),
  };
  let response;
  let assistantResponse;
  let finishReason;
  let parseResponse;
  let conversation = [
    {
      role: "system",
      content: instructions + "\nTools : " + JSON.stringify(toolsUse),
    },
    {
      role: "user",
      content: JSON.stringify(parsedMessage),
    },
  ];
  console.log(
    `\n ---- Agent ${agentName} called with conversation: ${conversation} --- \n`
  );

  do {
    countExec++;
    const body = {
      model,
      max_tokens: 4000,
      temperature: 0.1,
      top_p: 0.1,
      messages: conversation,
    };

    response = await chatCompletions(body);
    console.log(response);
    
    assistantResponse = response.choices[0].message.content;
    assistantResponse = assistantResponse;
    console.log(assistantResponse);
    // clean json response  ```json and ```
    assistantResponse = assistantResponse.replace(/```json/g, "");
    assistantResponse = assistantResponse.replace(/```/g, "");

    parseResponse = JSON.parse(assistantResponse.trim());
    finishReason = parseResponse.finish_reason;
    console.log(
      "FINISH REASON: ",
      finishReason,
      "FINISH REASON'S RESPONSE: ",
      assistantResponse
    );

    if (finishReason == "tool_calls") {
      const functions = parseResponse.functions;
      if (!functions)
        throw createHttpError(500, "No tool calls found in the LLM response");
      console.log(functions);

      for (const toolIndex in functions) {
        const tool = functions[toolIndex];
        console.log(tool);

        const toolName = tool.name;
        console.log("toolCall." + toolName);
        console.log(tool.args);

        const toolToCall = tools[toolName];
        let toolArgs = tool.args;
        try {
          console.log(typeof toolArgs.sections);
          let parsedSection = null;
          if (
            typeof toolArgs.sections == "string" ||
            typeof toolArgs.section == "string"
          ) {
            parsedSection =
              JSON.parse(toolArgs.sections) || JSON.parse(toolArgs.section);
            console.log(parsedSection);
          } else {
            parsedSection = toolArgs.sections || toolArgs.section;
          }
          console.log(parsedSection);

          if (Array.isArray(parsedSection)) {
            toolArgs = parsedSection;
          } else {
            toolArgs = [toolArgs.section];
          }
        } catch (e) {
          toolArgs = [toolArgs.section];
        }
        console.log("toolName", toolName, "toolArgs", toolArgs);

        try {
          const toolResponse = await toolToCall(toolArgs);
          console.log("toolResponse", toolResponse);

          conversation = [
            {
              role: "assistant",
              content: instructions,
            },
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
            role: "assistant",
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
  console.log("RESPONSE FROM ", agentName, ":", assistantResponse);
  console.log("finishReason", finishReason);
  console.log("countExec", countExec);
  console.log("-----------------------------------");

  return {
    parseResponse,
    usage: response?.usage,
    response,
    countExec,
  };
}

module.exports = agentChatCompletions;
