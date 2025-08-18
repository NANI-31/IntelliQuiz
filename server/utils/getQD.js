import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env.GITHUB_TOKEN || process.env.AZUREAI_API_KEY;
const endpoint = "https://models.github.ai/inference";
const model = "deepseek/DeepSeek-V3-0324";

async function getQuizzes() {
  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "" },
        {
          role: "user",
          content:
            'Give me exactly 1 easy express interview questions formatted as a single JSON array of objects. Do not include markdown formatting. Each object must follow this structure: { "question": "...", "choices": ["...", "...", "...", "..."], "answerIndex": number, "explanation": "..." }',
        },
      ],
      temperature: 0.8,
      top_p: 0.1,
      max_tokens: 2048,
      model: model,
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

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
    return quizzes;
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    console.log("Raw response:", cleanedText);
  }
}
module.exports = getQuizzes;
