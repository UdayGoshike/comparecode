const connection = require("../config/db");
const getProfile = (req, res) => {

    const sql = `
    SELECT

        u.username,

        COUNT(a.id) AS totalProblems,

        ROUND(AVG(a.score),0) AS overallScore,

        MAX(a.score) AS bestScore,

        MIN(a.score) AS worstScore,

        SUM(
            CASE
            WHEN a.time_complexity = a.optimal_time_complexity
            THEN 1
            ELSE 0
            END
        ) AS optimalSolutions

    FROM users u

    LEFT JOIN analyses a
    ON u.id = a.user_id

    WHERE u.id = ?

    GROUP BY u.id
    `;

    connection.query(sql,[req.user.id],(err,result)=>{

        if(err)
            return res.status(500).json({
                message:err.message
            });

        res.json(result[0]);

    });

};
const getReport = (req, res) => {
  const sql = `
        SELECT *
        FROM analyses
        WHERE id = ?
        AND user_id = ?
    `;

  connection.query(sql, [req.params.id, req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length === 0)
      return res.status(404).json({
        message: "Report not found",
      });

    res.json(results[0]);
  });
};
const getProfileStats = (req, res) => {
  const sql = `
        SELECT
            COUNT(*) AS totalProblems,
            AVG(score) AS overallScore,
            MAX(score) AS bestScore,
            MIN(score) AS worstScore,
            SUM(
                CASE
                    WHEN time_complexity = optimal_time_complexity
                    THEN 1
                    ELSE 0
                END
            ) AS optimalSolutions
        FROM analyses
        WHERE user_id = ?;
    `;

  connection.query(sql, [req.user.id], (err, results) => {
    if (err)
      return res.status(500).json({
        message: err.message,
      });

    res.json(results[0]);
  });
};
const deleteReport = (req, res) => {

    const sql = `
        DELETE FROM analyses
        WHERE id = ?
        AND user_id = ?
    `;

    connection.query(
        sql,
        [req.params.id, req.user.id],
        (err, result) => {

            if (err)
                return res.status(500).json({ message: err.message });

            res.json({
                message: "Deleted Successfully"
            });

        }
    );
};
const getHistory = (req, res) => {
  const sql = `
        SELECT
    id,
    platform,
    problem_name,
    algorithm,
    time_complexity,
    optimal_time_complexity,
    score
FROM analyses
WHERE user_id = ?
ORDER BY created_at DESC;
    `;

  connection.query(sql, [req.user.id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.json(results);
  });
};

module.exports = {
  getHistory,
  getReport,
  getProfileStats,
  getProfile,
  deleteReport
};
