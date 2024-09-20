import React, { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthService } from "../services/Auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const authService = AuthService();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('userName');
    if (isAuthenticated) {
      
      navigate('/');
    }
  }, [navigate]);

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
          onChange={(e) => setUser({...user, email:e.target.value})}
        />
        
        <input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({...user,password:e.target.value})}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
