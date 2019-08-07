import React from "react";

import logo from "./images/logo.svg";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <form>
        <img src={logo} alt="Tindev" />
        <input placeholder="Enter yout github user" />
        <button>Login</button>
      </form>
    </div>
  );
}
