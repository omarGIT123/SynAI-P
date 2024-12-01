const chatCompletions = require("./agentController");

async function agentChatCompletions(
  agentName,
  toolDefs,
  instructions,
  tools,
  userMessage
) {
  let countExec = 0;
  const model = "meta-llama/llama-3.2-3b-instruct:free";
  // Prepare tool definitions if any tools are provided
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

  // Execute the loop to handle conversation and tool calls
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
    console.log(response);
    assistantResponse = response.choices[0].message.content;
    assistantResponse = assistantResponse;
    console.log(assistantResponse);
    parseResponse = JSON.parse(assistantResponse.trim());
    console.log("here");
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
          // If it's a valid JSON string that can be parsed into an array, do it
          console.log(typeof toolArgs.sections);
          let parsedSection = null;
          if (
            typeof toolArgs.sections == "string" ||
            typeof toolArgs.section == "string"
          ) {
            console.log("here");
            parsedSection =
              JSON.parse(toolArgs.sections) || JSON.parse(toolArgs.section);
            console.log(parsedSection);
          } else {
            console.log("here 2");
            parsedSection = toolArgs.sections || toolArgs.section;
          }
          console.log(parsedSection);
          // Check if the parsed result is an array
          if (Array.isArray(parsedSection)) {
            toolArgs = parsedSection; // Wrap in an array
          } else {
            toolArgs = [toolArgs.section]; // It's not an array, just put the string in an array
          }
        } catch (e) {
          // If parsing fails, treat it as a plain string and wrap in an array
          toolArgs = [toolArgs.section];
        }
        console.log("toolName", toolName, "toolArgs", toolArgs);
        try {
          // Execute the tool and wait for the response
          const toolResponse = await toolToCall(toolArgs);
          console.log("toolResponse", toolResponse);

          // Add the tool's response to the conversation
          conversation = [
            {
              role: "system",
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
          // Optionally handle errors for tool failures
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
    // Check if tool calls are needed based on finishReason
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
