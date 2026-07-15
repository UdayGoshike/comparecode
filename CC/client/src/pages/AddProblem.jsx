import { useState } from "react";
import "./AddProblem.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
function AddProblem() {
  

  const navigate = useNavigate();
  const [problemStatement, setProblemStatement] = useState("");
  const [constraints, setConstraints] = useState("");
  const [platform, setPlatform] = useState("Codeforces");
  const [language, setLanguage] = useState("C++");
  
  const [sourceCode, setSourceCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAnalyze = async () => {
    if (
      !platform ||
      !language ||
      !problemStatement ||
      !constraints ||
      !sourceCode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/analyze",

        {
          platform,
          language,
          
          problemStatement,
          constraints,
          sourceCode,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      navigate(`/report/${response.data.analysisId}`);
    } catch (err) {
      console.log(err);

      alert("Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="add-container">
      <h1>Analyze New Solution</h1>

      <div className="form-group">
        <label>Platform</label>

        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option>Codeforces</option>

          <option>LeetCode</option>

          <option>CodeChef</option>

          <option>AtCoder</option>

          <option>HackerRank</option>

          <option>Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Language</label>

        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option>C++</option>

          <option>Java</option>

          <option>Python</option>

          <option>JavaScript</option>

          <option>C</option>
        </select>
      </div>
      <div className="form-group">
        <label>Problem Statement</label>

        <textarea
          rows="8"
          placeholder="Paste the complete problem statement..."
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Constraints</label>

        <textarea
          rows="4"
          placeholder="Example: 1 ≤ N ≤ 2×10^5"
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Source Code</label>

        <textarea
          rows="15"
          placeholder="Paste your solution here..."
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
        />
      </div>

      <button
        className="analyze-btn"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Solution"}
      </button>
    </div>
    </>
  );
}

export default AddProblem;
