import React, { useState, useContext } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { QuestionContext } from "../../context/QuestionContext"; // Adjust path if needed

const LoginPage = () => {
  const [teamName, setTeamNameLocal] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { setTeamName } = useContext(QuestionContext);  // Get context setter

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamname: teamName, memname1: member1, memname2: member2 }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful!", data);
        setMessage("Login successful! 🎉");
        setTeamName(teamName); // ✅ Store in context
        alert("Team Registered successfully");
        navigate("/rules"); // Redirect to rules page
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("Server error. Try again!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign in</h2>
        <p className="description">
          Enter your credentials to access the Codewars platform
        </p>
        <form onSubmit={handleLogin}>
          <div className="login-team">
            <label htmlFor="team-name">Team Name</label>
            <input
              type="text"
              id="team-name"
              placeholder="Enter Team Name"
              required
              value={teamName}
              onChange={(e) => setTeamNameLocal(e.target.value)}
            />
          </div>
          <div className="login-member">
            <label>Team Members</label>
            <input
              type="text"
              id="team-mem1"
              placeholder="Enter Team Member Name 1"
              required
              value={member1}
              onChange={(e) => setMember1(e.target.value)}
            />
            <input
              type="text"
              id="team-mem2"
              placeholder="Enter Team Member Name 2"
              required
              value={member2}
              onChange={(e) => setMember2(e.target.value)}
            />
          </div>
          <div className="role-group">
            <p className="note">
              Note: Enter your valid member names. The names you provide will appear on the certificates.
            </p>
          </div>
          {message && <p className="error-message">{message}</p>}
          <button type="submit" className="signin-link">
            <p className="signin-cta">Sign in</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
