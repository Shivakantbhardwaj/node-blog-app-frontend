import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();  

  return (
    <div className="homepage-container">
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to the Blog App</h1>
      <p>Your platform to share and discover amazing blogs!</p>
      <div>
        <button onClick={() => navigate("/login")} style={{ margin: "10px" }}>
          Login
        </button>
        <button onClick={() => navigate("/signup")} style={{ margin: "10px" }}>
          Signup
        </button>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
