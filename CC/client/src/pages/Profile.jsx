import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/report/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProfile(response.data);
    };

    fetchProfile();
  }, []);

  if (!profile) return <h2>Loading...</h2>;

  return (
    <>
      {" "}
      <Header />
      <div className="profile">
        <h1>Hey,{profile.username}</h1>

        <div className="cards">
          <div className="card">
            <h2>{profile.overallScore || 0}%</h2>
            <p>Overall Score</p>
          </div>

          <div className="card">
            <h2>{profile.totalProblems}</h2>
            <p>Problems Solved</p>
          </div>

          <div className="card">
            <h2>{profile.optimalSolutions}</h2>
            <p>Optimal Solutions</p>
          </div>

          <div className="card">
            <h2>{profile.bestScore}</h2>
            <p>Best Score</p>
          </div>

          <div className="card">
            <h2>{profile.worstScore}</h2>
            <p>Lowest Score</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
