import React, { useEffect, useState } from "react";
import axios from "axios";

import classes from "../styles/Profile.module.css";
import { Button, Input } from "antd";

import styles from "../styles/EditProviderProfile.module.css";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

export default function EditProviderProfile() {
  const location = useLocation();
  const { providerId } = location.state;
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileData, setProfileData] = useState({
    providerId: "",
    providerName: "",
    bio: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    imageFile: "",
  });

  const fetchData = async () => {
    let token = sessionStorage.getItem("jwtToken");
    try {
      const response = await axios.get(
        `http://localhost:8080/getProviderById?providerId=${providerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);

      setProfileData(data);
      setSelectedImage(`http://localhost:8080/file/images/${data.imageFilePath}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateData = async () => {
    const formData = new FormData();
    formData.append("providerName", profileData.providerName);
    formData.append("bio", profileData.bio);
    formData.append("email", profileData.email);
    formData.append("phone", profileData.phone);
    formData.append("city", profileData.city);
    formData.append("country", profileData.country);
    formData.append("imageFile", profileData.imageFile);

    let token = sessionStorage.getItem("jwtToken");
    try {
      const response = await axios.put(
        `http://localhost:8080/${providerId}/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(profileData);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setProfileData({ ...profileData, imageFile: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={styles.editContainer}>
        <div className={styles.fileInput}>
          <div
            style={{
              width: "150px",
              height: "150px",
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedImage && selectedImage != "" ? (
              <img
                src={selectedImage}
                alt="Selected Image"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <PlusOutlined style={{ fontSize: "32px" }} />
            )}
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("imageFile").click()}
          >
            Upload new
          </button>

          <input
            id="imageFile"
            type="file"
            accept=".jpg, .png, .gif"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <button
            style={{ background: "#ededed", color: "#000000" }}
            onClick={() => {
              setSelectedImage(null);
              document.getElementById("imageFile").value = "";
              setProfileData({ ...profileData, imageFile: "" });
            }}
          >
            Reset
          </button>
        </div>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "1rem 1rem",
            flexGrow: "1",
          }}
          className={classes.profile_container}
        >
          <div className={classes.top_inputs}>
            <div className={classes.input_field}>
              <label htmlFor="">Provider's Name</label>
              <input
                type="text"
                placeholder="Providers Name"
                value={profileData.providerName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    providerName: e.target.value,
                  })
                }
              />
            </div>
            <div className={classes.input_field}>
              <label htmlFor="">Bio</label>
              <textarea
                style={{ resize: "none" }}
                name=""
                id=""
                placeholder="Bio"
                rows={8}
                cols={12}
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
              ></textarea>
            </div>
          </div>
          <div className={classes.bottom_inputs}>
            <div className={classes.input_field}>
              <label htmlFor="">Email</label>
              <input
                type="text"
                placeholder="Email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            </div>
            <div className={classes.input_field}>
              <label htmlFor="">Phone</label>
              <input
                type="text"
                placeholder="Phone"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
              />
            </div>
            <div className={classes.input_field}>
              <label htmlFor="">City</label>
              <input
                type="text"
                placeholder="City"
                value={profileData.city}
                onChange={(e) =>
                  setProfileData({ ...profileData, city: e.target.value })
                }
              />
            </div>
            <div className={classes.input_field}>
              <label htmlFor="">Country</label>
              <input
                type="text"
                placeholder="Country"
                value={profileData.country}
                onChange={(e) =>
                  setProfileData({ ...profileData, country: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomButtons}>
        <button onClick={updateData}>Save Changes</button>
      </div>
    </>
  );
}
