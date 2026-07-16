import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
function Dashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
  const deleteAnalysis = async (id) => {
    if (!window.confirm("Delete this analysis?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/report/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions(questions.filter((q) => q.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
  `${API_URL}/api/report/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setQuestions(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();
  }, []);
  const deleteSubmission = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this analysis?",
    );

    if (!confirmDelete) return; 
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/report/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions(questions.filter((question) => question.id !== id));
    } catch (err) {
      console.log(err);

      alert("Failed to delete submission");
    }
  };
  return (
    <>
      {/*    */}
      <div className="dashboard">
        <header className="header">
          <h2>CompareCode</h2>

          <div className="header-buttons">
            <button onClick={() => navigate("/add-problem")}>
              + Analyze Problem
            </button>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>

            <button onClick={() => navigate("/profile")}>Profile</button>
          </div>
        </header>

        <div className="content">
          <h1>Hello, Uday 👋</h1>

          <p>Ready to analyze your next solution?</p>

          <h2 className="recent-title">Analysis History</h2>

          {questions.length === 0 ? (
            <div className="empty">No analyses yet.</div>
          ) : (
            <div className="history-table">
              <div className="table-header">
                <span>Platform</span>

                <span>Problem</span>

                <span>Algorithm</span>

                <span>Your TC</span>

                <span>Optimal TC</span>

                <span>Score</span>

                <span></span>
              </div>

              {questions.map((question) => (
                <div className="table-row" key={question.id}>
                  <div>{question.platform}</div>

                  <div>{question.problem_name}</div>

                  <div>{question.algorithm}</div>

                  <div className="user-tc">{question.time_complexity}</div>

                  <div className="optimal-tc">
                    {question.optimal_time_complexity}
                  </div>

                  <div>
                    <span className="score">{question.score}/100</span>
                  </div>

                  <button
                    className="view-btn"
                    onClick={() => navigate(`/report/${question.id}`)}
                  >
                    View
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteSubmission(question.id)}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
