import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/Auth";

const OAuth2RedirectHandler = () => {
  const authService = AuthService();
  const navigate = useNavigate();
  
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const user = queryParams.get('user')
    console.log(token);
    console.log(user);
    
    if (token) {
      authService.setJwtTokenInLocalstorage(token);
        authService.setUserNameInLocalstorage(user);
        authService.setLoginState("alpha");
      navigate("/")
    }
  }, []);
  

  
};

export default OAuth2RedirectHandler;
