import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (profileImage) formData.append("profileImage", profileImage);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, formData);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (error) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
