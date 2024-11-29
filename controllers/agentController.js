const OpenAI = require("openai");

require("dotenv").config();

async function chatCompletion(body) {
  console.log(body);
  try {
    const openai = new OpenAI({
      baseURL: process.env.BASE_URL,
      apiKey: process.env.OPENROUTER_API_KEY,
    });
    const completion = await openai.chat.completions.create(body);
    console.log(completion);
    return completion;
  } catch (error) {
    return error;
  }
}

module.exports = chatCompletion;
