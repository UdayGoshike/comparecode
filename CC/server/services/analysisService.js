const connection = require("../config/db");

const saveAnalysis = (analysisData) => {
  return new Promise((resolve, reject) => {

    const sql = `
      INSERT INTO analyses
      (
          user_id,
          platform,
          language,
          problem_name,
          problem_url,
          source_code,
          algorithm,
          time_complexity,
          space_complexity,
          optimal_algorithm,
          optimal_time_complexity,
          optimal_space_complexity,
          score,
          strengths,
          weaknesses,
          suggestions,
          ai_summary
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      sql,
      [
        analysisData.userId,

        analysisData.platform,

        analysisData.language,

        analysisData.problemName,

        analysisData.problemUrl,

        analysisData.sourceCode,

        analysisData.algorithm,

        analysisData.timeComplexity,

        analysisData.spaceComplexity,

        analysisData.optimalAlgorithm,

        analysisData.optimalTimeComplexity,

        analysisData.optimalSpaceComplexity,

        analysisData.score,

        analysisData.strengths,

        analysisData.weaknesses,

        analysisData.suggestions,

        analysisData.summary,
      ],

      (err, result) => {

        if (err) {
          return reject(err);
        }

        resolve(result.insertId);

      }
    );
  });
};

module.exports = {
  saveAnalysis,
};