import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="header">
      <h2 className="logo" onClick={() => navigate("/dashboard")}>
        CompareCode
      </h2>

      <div className="header-buttons">

        {location.pathname !== "/add-problem" && (
          <button onClick={() => navigate("/add-problem")}>
            + Analyze Problem
          </button>
        )}

        {location.pathname !== "/dashboard" && (
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        )}

        {location.pathname !== "/profile" && (
          <button onClick={() => navigate("/profile")}>
            Profile
          </button>
        )}

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>
    </header>
  );
}

export default Header;