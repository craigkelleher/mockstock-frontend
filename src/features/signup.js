import React, { useState, useEffect } from "react";
import usaaLogo from "../Assets/usaa.png";
import Footer from "./Footer";
import "../css/Login.css";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
	const [username, setUsername] = useState("");
	const [firstName, setfirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		document.body.classList.add("login-page");
		return () => {
			document.body.classList.remove("login-page");
		};
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = {
			name: username,
			firstName: firstName,
			lastName: lastName,
			password: password,
			balance: 17500
		};
		const requestOptions = {
			headers: {"Content-Type": "application/json",Accept: "application/json",},
		};

		axios.post("http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user", data, requestOptions)
		.then((response) => {
			navigate('/login')
		})
		.catch((error) => {
			console.log(error);
		});
		console.log("User signed up:", { username, firstName, lastName, password });
	};

	return (
		<div className="container">
			<img src={usaaLogo} className="loginLogo" alt="USAA Logo" style={{ width: "200px" }}/>
			<div className="login-signup">
				<h2>Sign Up</h2>
				<form onSubmit={handleSubmit}>
				<div className="form-module">
					<input type="text" placeholder="First Name" id="firstName"
					onChange={(e) => setfirstName(e.target.value)}required autoFocus/>
				</div>
				<div className="form-module">
					<input type="lastName" placeholder="Last Name" id="lastName"
					onChange={(e) => setlastName(e.target.value)}required/>
				</div>
				<div className="form-module">
					<input  type="text" placeholder="Username" id="firstName"
					onChange={(e) => setUsername(e.target.value)}required/>
				</div>
				<div className="form-module">
					<input type="password" placeholder="Password" id="password"
					onChange={(e) => setPassword(e.target.value)} required/>
				</div>
				<button type="submit">Sign Up</button>
				</form>
			</div>
			<Footer />
		</div>
	);
}

export default SignUpPage;