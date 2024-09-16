import React from "react";
import axios from "axios";

export const ProviderService = () => {
  const token = sessionStorage.getItem("jwtToken");
  const header = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    };
  const baseUrl = "http://localhost:8080";


  
  const saveProvider = async (formData) => {
    try {
      console.log(formData);
      
      const response = await axios.post(`${baseUrl}/saveprovider`, formData, {
        headers: header
      })
      return response.data; // Returns the response data
    } catch (error) {
      console.log(token);
      
      console.error("Saving failed:", error);
      throw error;
    }
  };

  return {
    saveProvider,
  };
};
