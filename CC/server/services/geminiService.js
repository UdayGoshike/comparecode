const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeCode = async (
  platform,
  language,
  problemStatement,
  constraints,
  sourceCode,
) => {
  const prompt = `
Compare the submitted solution with the best known competitive programming approach.



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

Your task:

1. Understand the problem.
2. Determine the algorithm used.
3. Determine the actual time complexity.
4. Determine the space complexity.
5. Decide whether this solution is optimal based on the constraints.
6. Compare it with the best known approach.
7. Give a score out of 100.
8. Mention strengths.
9. Mention weaknesses.
10. Give suggestions.
11. Summarize the solution.

Return ONLY valid JSON.

{
  "algorithm":"",
  "timeComplexity":"",
  "spaceComplexity":"",
  "optimalAlgorithm":"",
  "optimalTimeComplexity":"",
  "optimalSpaceComplexity":"",
  "score":0,
  "strengths":"",
  "weaknesses":"",
  "suggestions":"",
  "summary":""
}
`;
  console.log("Calling Gemini...");
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });
  let text = response.text;

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return text;
};

module.exports = {
  analyzeCode,
};
