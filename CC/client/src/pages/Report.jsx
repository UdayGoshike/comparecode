import "./Report.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

import {
  FaBrain,
  FaClock,
  FaMemory,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaArrowLeft,
} from "react-icons/fa";

function Report() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/report/${id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setReport(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReport();
  }, [id]);

  if (!report) return <h2 style={{ color: "white" }}>Loading...</h2>;

  return (
    <>
      <Header />
    <div className="report-page">
      <h1 className="report-title">AI Analysis Report</h1>

      <div className="score-card">
        <h2>Overall Score</h2>

        <div className="score-circle">
          <span>{report.score}</span>

          <small>/100</small>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <FaBrain className="icon blue" />

          <h3>Algorithm</h3>

          <p>{report.algorithm}</p>
        </div>

        <div className="info-card">
          <FaClock className="icon orange" />

          <h3>Time Complexity</h3>

          <p>{report.time_complexity}</p>
        </div>

        <div className="info-card">
          <FaMemory className="icon purple" />

          <h3>Space Complexity</h3>

          <p>{report.space_complexity}</p>
        </div>
      </div>
      <div className="section comparison">
        <h2>🚀 Optimal Solution</h2>

        <div className="comparison-grid">
          <div className="compare-card">
            <h3>Algorithm</h3>

            <p>Your:</p>
            <strong>{report.algorithm}</strong>

            <p>Optimal:</p>
            <strong>{report.optimal_algorithm}</strong>
          </div>

          <div className="compare-card">
            <h3>Time Complexity</h3>

            <p>Your:</p>
            <strong>{report.time_complexity}</strong>

            <p>Optimal:</p>
            <strong>{report.optimal_time_complexity}</strong>
          </div>

          <div className="compare-card">
            <h3>Space Complexity</h3>

            <p>Your:</p>
            <strong>{report.space_complexity}</strong>

            <p>Optimal:</p>
            <strong>{report.optimal_space_complexity}</strong>
          </div>
        </div>
      </div>
      <div className="section success">
        <h2>
          <FaCheckCircle />
          Strengths
        </h2>

        <p>{report.strengths}</p>
      </div>

      <div className="section danger">
        <h2>
          <FaExclamationTriangle />
          Weaknesses
        </h2>

        <p>{report.weaknesses}</p>
      </div>

      <div className="section warning">
        <h2>
          <FaLightbulb />
          Suggestions
        </h2>

        <p>{report.suggestions}</p>
      </div>

      <div className="section">
        <h2>Summary</h2>

        <p>{report.ai_summary}</p>
      </div>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        <FaArrowLeft />
        Back to Dashboard
      </button>
    </div>
    </>
  );
}

export default Report;
