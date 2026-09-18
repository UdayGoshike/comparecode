const { analyzeCode } = require("../services/groqService");
const { saveAnalysis } = require("../services/analysisService");
const calculateScore = require("../utils/scoreCalculator");

const analyzeSolution = async (req, res) => {

  const {
    platform,
    language,
    problemStatement,
    constraints,
    sourceCode,
    problemUrl
  } = req.body;

  if (!platform || !language || !sourceCode) {
    return res.status(400).json({
      message: "Platform, Language and Source Code are required.",
    });
  }

  try {

    const analysis = await analyzeCode(
      platform,
      language,
      problemStatement,
      constraints,
      sourceCode
    );

    console.log("===== GROQ RESPONSE =====");
    console.log(analysis);

    const parsedAnalysis = JSON.parse(analysis);

    const score = calculateScore(
      parsedAnalysis.timeComplexity,
      parsedAnalysis.optimalTimeComplexity
    );

    console.log("===== JSON PARSED =====");
    console.log(parsedAnalysis);

    const analysisId = await saveAnalysis({

      userId: req.user.id,

      platform,

      language,

      problemName: parsedAnalysis.problemName,

      problemUrl: problemUrl || null,

      sourceCode,

      algorithm: parsedAnalysis.algorithm,

      timeComplexity: parsedAnalysis.timeComplexity,

      spaceComplexity: parsedAnalysis.spaceComplexity,

      optimalAlgorithm: parsedAnalysis.optimalAlgorithm,

      optimalTimeComplexity: parsedAnalysis.optimalTimeComplexity,

      optimalSpaceComplexity: parsedAnalysis.optimalSpaceComplexity,

      score,

      strengths: parsedAnalysis.strengths,

      weaknesses: parsedAnalysis.weaknesses,

      suggestions: parsedAnalysis.suggestions,

      summary: parsedAnalysis.summary,

    });

    console.log("===== SAVED TO DATABASE =====");
    console.log(analysisId);

    res.json({
      message: "Analysis Saved Successfully",
      analysisId,
      report: parsedAnalysis,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message,
    });

  }

};

module.exports = {
  analyzeSolution,
};