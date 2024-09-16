import React from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import classes from "../styles/AddProvider.module.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ProviderService } from "../services/ProviderService";

export default function AddProvider() {
  const providerService = ProviderService()
  const [activeStep, setActiveStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    email: "",
    phone: "",
    city: "",
    country: "",
  });
  const [reviewData, setReviewData] = useState({
    reviewImage: "",
    rating: "",
    review: "",
    reviewDate: "",
    country: "",
  });
  const [documentData, setDocumentData] = useState({ documentFile: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const updateProfileData = (data) =>
    setProfileData((prev) => ({ ...prev, ...data }));
  const updatereviewData = (data) =>
    setReviewData((prev) => ({ ...prev, ...data }));
  const updatedocumentData = (data) =>
    setDocumentData((prev) => ({ ...prev, ...data }));

  const navigate = useNavigate();

  const handleSave = async () => {
    // Final step

    // Collect all data and send to backend
    const allData = { profileData, reviewData, documentData };

    const formData = new FormData();
    formData.append("providerName", allData.profileData.name);
    formData.append("bio", allData.profileData.bio);
    formData.append("email", allData.profileData.email);
    formData.append("phone", allData.profileData.phone);
    formData.append("city", allData.profileData.city);
    formData.append("country", allData.profileData.country);
    formData.append("reviewText", allData.reviewData.review);
    formData.append("reviewDate", allData.reviewData.reviewDate);
    formData.append("reviewCountry", allData.reviewData.country);
    formData.append("rating", allData.reviewData.rating);
    formData.append("reviewImage", allData.reviewData.reviewImage);
    formData.append("documentFile", allData.documentData.documentFile);
    console.log(allData.documentData.documentFile);
    
    
    try {
      const response = await providerService.saveProvider(formData)

      if (response.status) {
        alert(response.message);
        console.log("success");

        navigate("/provider");
      } else {
        console.log("failed");

        setErrorMessage("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      
      setErrorMessage("Something went wrong");
    }
  };

  const handleStepClick = () => {
    setActiveStep((prevStep) => {
      let newStep = prevStep + 1;

      if (newStep === 2) {
        navigate("/add-provider/review");
      } else if (newStep === 3) {
        navigate("/add-provider/document");
      }

      return newStep;
    });
  };

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch("/api/save-provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.container_content}>
          <div className={classes.add_providers}>
            <h2>Add New Providers</h2>
            <p>
              Increase team capacity by seamlessly adding new service providers.
            </p>

            <div className={classes.steps_container}>
              <div
                className={`${classes.step} ${
                  activeStep === 1 ? classes.active : classes.disabled
                }`}
              >
                <div className={classes.step_circle}>1</div>
                <div className={classes.step_label}>Profile</div>
              </div>

              <div
                className={`${classes.step} ${
                  activeStep === 2 ? classes.active : classes.disabled
                }`}
              >
                <div className={classes.step_circle}>2</div>
                <div className={classes.step_label}>Reviews</div>
              </div>

              <div
                className={`${classes.step} ${
                  activeStep === 3 ? classes.active : classes.disabled
                }`}
              >
                <div className={classes.step_circle}>3</div>
                <div className={classes.step_label}>Documents</div>
              </div>
            </div>
          </div>
          <hr />
          <div className={classes.content}>
            <Outlet
              context={{
                updateProfileData,
                updatereviewData,
                updatedocumentData,
              }}
            />
          </div>
        </div>

        <div className={classes.next_field}>
          <button onClick={activeStep == 4 ? handleSave : handleStepClick}>
            {activeStep < 3 ? "Next" : "Add New Provider"}{" "}
            <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </>
  );
}
