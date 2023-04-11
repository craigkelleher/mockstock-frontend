import React, { useState } from "react";
import usaaLogo from "../Assets/usaa1.jpg";
import Footer from "./Footer";
import "../Login.css";
import axios from "axios";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {

    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    axios
      .post("http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/login", data, requestOptions)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUsername("");
        setPassword("");
        window.location.replace("http://localhost:3000/portfolio");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <img
        src={usaaLogo}
        className="loginLogo"
        alt="USAA Logo"
        style={{ width: "200px" }}
      />
      <div className="login-module">
        <h2>Welcome!</h2>
        <form onSubmit={handleLogin}>
          <div className="form-module">
            <input
              type="text"
              placeholder="Username"
              id="email"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-module">
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
