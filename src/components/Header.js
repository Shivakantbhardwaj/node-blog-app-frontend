import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css"; // Import styles

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/"); // Redirect to login page
  };

  return (
    <header className="header">
      <h2>Blog App</h2>
      {user && (
        <div className="profile-container">
        <img
  src={user.profileImage ? `http://localhost:5000/uploads/${user.profileImage}` : "/default-avatar.png"}
  alt="Profile"
  className="profile-image"
  onClick={() => setDropdownOpen(!dropdownOpen)}
/>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
