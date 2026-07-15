import "./Analyze.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Analyze() {

    const [url, setUrl] = useState("");

    const navigate = useNavigate();

    function handleAnalyze() {

        if(url.trim() === ""){
            alert("Please enter a Codeforces submission URL.");
            return;
        }

        // Backend API call will go here

        navigate(`/report/${question.id}`); 
    }

    return (

        <div className="analyze-container">

            <header className="header">

                <h2>CompareCode</h2>

            </header>

            <div className="analyze-box">

                <h1>Analyze Submission</h1>

                <p>
                    Paste your Codeforces submission URL below.
                </p>

                <input
                    type="text"
                    placeholder="https://codeforces.com/contest/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <button
                    className="analyze-btn"
                    onClick={handleAnalyze}
                >
                    Fetch & Analyze
                </button>

            </div>

        </div>

    );
}

export default Analyze;