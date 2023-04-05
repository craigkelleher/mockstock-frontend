import React from "react";
import usaaLogo from "../Assets/usaa1.jpg";
import Footer from "./Footer";
import '../Login.css';


const Login = () => {
    return (
        <div className="container">
            <img src={usaaLogo} className="loginLogo"alt="USAA Logo" style={{width:'200px'}}/>
            <div className="login-module">
                <h2>Welcome!</h2>
                <form>
                    <div className="form-module">
                        {/* <label htmlFor="email">Email:</label> */}
                        <input type="email" placeholder="Email" id="email" required />
                    </div>
                    <div className="form-module">
                        {/* <label htmlFor="password">Password:</label> */}
                        <input type="password" placeholder="Password" id="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default Login;