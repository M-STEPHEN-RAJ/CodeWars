import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign in</h2>
        <p className="description">
          Enter your credentials to access the Codewars platform
        </p>
        <div className="login-team">
          <label htmlFor="team-name">Team Name</label>
          <input type="text" id="team-name" placeholder="Enter Team Name" required />
        </div>
        <div className="login-member">
          <label>Team Members</label>
          <input type="text" id="team-mem1" placeholder="Enter Team Member Name 1" required />
          <input type="text" id="team-mem2" placeholder="Enter Team Member Name 2" required />
        </div>
        <div className="role-group">
          <p className="note">
            Note: Enter your valid member names. The names you provide will appear on the certificates.
          </p>
        </div>
        <Link to={'/rules'} className="signin-link">
          <p className="signin-cta">Sign in</p>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
