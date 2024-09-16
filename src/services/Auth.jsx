import axios from 'axios';
import { useState } from 'react';


const GlobalVar = {
  userNameKey: 'userName',
  loginStateKey: 'loginState',
  tokenKey: 'jwtToken',
};

export const AuthService = () => {
  const [usernameSubject, setUsernameSubject] = useState(sessionStorage.getItem(GlobalVar.userNameKey) || '');
  const [departmentNameSubject, setDepartmentNameSubject] = useState('');

  const baseUrl = "http://localhost:8080"

  // Login function: sends a POST request to login using axios
  const login = async (user) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, user);
      return response.data; // Returns the response data
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  

  // Store username in session storage
  const setUserNameInLocalstorage = (userName) => {
    sessionStorage.setItem(GlobalVar.userNameKey, userName);
    setUsernameSubject(userName);
  };

  // Set login state in session storage
  const setLoginState = (loginState) => {
    sessionStorage.setItem(GlobalVar.loginStateKey, loginState);
  };

  // Get login state from session storage
  const getLoginState = () => {
    return sessionStorage.getItem(GlobalVar.loginStateKey) || '';
  };

  // Store JWT token in session storage
  const setJwtTokenInLocalstorage = (token) => {
    sessionStorage.setItem(GlobalVar.tokenKey, token);
  };

  // Get the stored username from session storage
  const getUserNameFromLocalstorage = () => {
    return usernameSubject;
  };

  // Get the department list from the JWT token
  const getDepartmentList = () => {
    const token = getJwtTokenFromLocalstorage();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.departments;
    }
    return [];
  };

  // Get the current user from the JWT token
  const getCurrentUser = () => {
    const token = getJwtTokenFromLocalstorage();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.sub;
    }
    return null;
  };

  // Get JWT token from session storage
  const getJwtTokenFromLocalstorage = () => {
    return sessionStorage.getItem(GlobalVar.tokenKey) || '';
  };

  // Check if the JWT token is expired
  const isTokenExpired = (token) => {
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(tokenData.exp * 1000);
    return expirationDate <= new Date();
  };

  // Clear all session storage data
  const clearLocalStorage = () => {
    sessionStorage.removeItem(GlobalVar.tokenKey);
    sessionStorage.removeItem(GlobalVar.userNameKey);
    sessionStorage.removeItem(GlobalVar.loginStateKey);
    setUsernameSubject('');
    setDepartmentNameSubject('');
  };

  // Logout function
  const logout = async () => {
    if (getLoginState() === 'alpha') {
      const currentUser = getCurrentUser();
      try {
        await axios.post(`${baseUrl}/logOut`, { userName: currentUser });
        clearLocalStorage();
        window.location.href = '/login'; // Redirect to login page
      } catch (error) {
        console.error('Logout failed:', error);
      }
    } else {
      clearLocalStorage();
      window.location.href = '/login'; // Redirect to login page
    }
  };

  return {
    login,
    setUserNameInLocalstorage, 
    setLoginState,
    getLoginState,
    setJwtTokenInLocalstorage,
    getUserNameFromLocalstorage,
    getDepartmentList,
    getCurrentUser,
    getJwtTokenFromLocalstorage,
    isTokenExpired,
    clearLocalStorage,
    logout,
  };
};
