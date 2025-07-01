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



const body = {
      model: "mistralai/mistral-small-3.2-24b-instruct:free",
      max_tokens: 2000,
      temperature: 0.1,
      top_p: 0.1,
      messages: [
      {
        "role": "user",
        "content":  "what is an image?",
      }
    ]

    };

chatCompletion(body)
  .then((response) => {
    console.log("Response:", response.choices[0].message.content);
  })
  .catch((error) => {
    console.error("Error:", error);
  });