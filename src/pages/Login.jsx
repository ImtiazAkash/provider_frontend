import React, { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthService } from "../services/Auth";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from 'js-cookie';
import axios from "axios";

function Login() {
  const authService = AuthService();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();


  useEffect(() => {
    
    const isAuthenticated = sessionStorage.getItem("userName");
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleSuccess = async (response) => {
    // Google OAuth2 access token received
    const { tokenId } = response;

    try {
      // Send the Google tokenId to your backend for verification
      window.location.href = 'http://localhost:8080/oauth2/authorization/google';

      // Assuming your backend sends back a JWT, store it in localStorage
      

      // Redirect or do something after successful login
      // navigate("/provider")
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleFacebookLogin =() => {
    try {
      // Send the Google tokenId to your backend for verification
      window.location.href = 'http://localhost:8080/oauth2/authorization/facebook';

      // Assuming your backend sends back a JWT, store it in localStorage
      

      // Redirect or do something after successful login
      // navigate("/provider")
      
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  }

 
  const handleFailure = (error) => {
    console.error('Google login failed:', error);
  };

  const handleLogin = async () => {
    try {
      const response = await authService.login(user);
      console.log(response.user.name);

      if (response.jwtToken) {
        authService.setJwtTokenInLocalstorage(response.jwtToken);
        authService.setUserNameInLocalstorage(response.user.name);
        authService.setLoginState("alpha");
        console.log("success");

        navigate("/provider");
      } else {
        console.log("failed");

        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <div className={styles.loginForm}>
      <h1>Login</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <p style={{ color: "gray" }}>Secure login for Hairline Admin</p>
      <div className={styles.inputBox}>
        <input
          prefix={<UserOutlined />}
          type="text"
          placeholder="Email address"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>

        <GoogleOAuthProvider clientId={`570740172128-hce9ee5fmcd7g4l8mavjsb9lq85se52c.apps.googleusercontent.com`}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleFailure}
          />
        </GoogleOAuthProvider>
        <button onClick={handleFacebookLogin}>Login with facebook</button>
      </div>
    </div>
  );
}

export default Login;
