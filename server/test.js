require("dotenv").config();
const OpenAI = require("openai");
const token = process.env.OPENAI_API_KEY;
async function main() {
  const client = new OpenAI({
    baseURL: "https://models.github.ai/inference",
    apiKey: token,
  });

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "" },
      {
        role: "user",
        content:
          'Give me exactly 2 easy JavaScript interview questions formatted as a single JSON array of objects. Do not include markdown formatting. Each object must follow this structure: { "question": "...", "choices": ["...", "...", "...", "..."], "answerIndex": number }',
      },
    ],
    model: "openai/gpt-4o",
    temperature: 1,
    max_tokens: 4096,
    top_p: 1,
  });

  const responseText = response.choices[0].message.content;

  // Clean any Markdown formatting
  let cleanedText = responseText
    .replace(/^```json\s*/i, "") // Remove opening ```json
    .replace(/```$/, "") // Remove closing ```
    .trim();

  // If multiple objects separated by comma, but not wrapped in array → wrap it
  if (
    cleanedText.startsWith("{") &&
    cleanedText.includes("},") &&
    !cleanedText.startsWith("[")
  ) {
    cleanedText = `[${cleanedText}]`;
  }

  let quizzes = [];

  try {
    const parsed = JSON.parse(cleanedText);
    quizzes = Array.isArray(parsed) ? parsed : [parsed];
    console.log("Parsed quizzes:", quizzes);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    console.log("Raw response:", cleanedText);
  }
}
