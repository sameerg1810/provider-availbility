import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>OTP Management</h1>
      <nav>
        <ul>
          <li>
            <Link to="/generate-otp">Generate OTP</Link>
          </li>
          <li>
            <Link to="/verify-otp">Verify OTP</Link>
          </li>

          <li>
            <Link to="/dashboard">Provider calendar</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
