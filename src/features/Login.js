import React, { useState, useEffect } from "react";
import usaaLogo from "../Assets/usaa2.png";
import Footer from "./Footer";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = ({ onAuthentication }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		document.body.classList.add("login-page");
		return () => {
			document.body.classList.remove("login-page");
		};
	}, []);

	const handleLogin = (event) => {
		event.preventDefault();
		const data = {
			username: username,
			password: password,
		};
		const requestOptions = {
			headers: {"Content-Type": "application/json", Accept: "application/json",},
		};

		axios.post("http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/login", data, requestOptions)
		.then((response) => {
			const token = response.data.token;
			localStorage.setItem("token", token);
			onAuthentication(true)
			setUsername("");
			setPassword("");
			navigate('/portfolio')
		})
		.catch((error) => {
			console.log(error);
		});
	};

	return (
		<div className="container">
			<img src={usaaLogo} className="loginLogo" alt="USAA Logo" style={{ width: "200px" }}/>
			<div className="login-module">
				<h2>Welcome!</h2>
				<form onSubmit={handleLogin}>
				<div className="form-module">
					<input type="text" placeholder="Username" id="email" 
					onChange={(e) => setUsername(e.target.value)}required autoFocus/>
				</div>
				<div className="form-module">
					<input type="password" placeholder="Password" id="password"
					onChange={(e) => setPassword(e.target.value)}required/>
				</div>
				<button type="submit">Login</button>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default Login;
