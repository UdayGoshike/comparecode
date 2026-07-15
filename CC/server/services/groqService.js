const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeCode = async (
  platform,
  language,
  problemStatement,
  constraints,
  sourceCode,
) => {
  const prompt = `
You are an expert competitive programming mentor.

Platform:
${platform}

Programming Language:
${language}

Problem Statement:
${problemStatement}

Constraints:
${constraints}

User Solution:
${sourceCode}

Your job is to carefully analyze the user's solution.

Return ONLY valid JSON.

Rules:
-if the problem statement is not clear, dont give the time and space complexity."
- Determine the exact problem title from the provided problem statement.
- If the title cannot be determined, generate a short descriptive name.
- Never leave problemName empty.
- Do NOT leave any field empty.
- If the solution is already optimal, set the optimal values equal to the user's values.
- Return ONLY JSON.
- Do NOT wrap JSON inside markdown.
- Score must be an integer between 0 and 100.
- timeComplexity and optimalTimeComplexity should contain only Big-O notation (e.g. O(N), O(N log N), O(N²)).
- spaceComplexity and optimalSpaceComplexity should contain only Big-O notation.

JSON FORMAT:

{   
  "problemName":"",
  "algorithm":"",
  "timeComplexity":"",
  "spaceComplexity":"",
  "optimalAlgorithm":"",
  "optimalTimeComplexity":"",
  "optimalSpaceComplexity":"",
  "strengths":"",
  "weaknesses":"",
  "suggestions":"",
  "summary":""
}
`;

  console.log("===== PROMPT =====");
  console.log(prompt);

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let text = response.choices[0].message.content;

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log("===== GROQ RESPONSE =====");
  console.log(text);

  return text;
};

module.exports = {
  analyzeCode,
};
