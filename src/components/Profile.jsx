import React, { useState } from "react";
import classes from "../styles/Profile.module.css";
import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const { updateProfileData } = useOutletContext();
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    email: "",
    phone: "",
    city: "",
    country: "",
  });

  return (
    <>
      <div className={classes.profile_container}>
        <h1>Profile</h1>
        <div className={classes.top_inputs}>
          <div className={classes.input_field}>
            <label htmlFor="">Provider's Name</label>
            <input
              type="text"
              placeholder="Providers Name"
              value={profileData.name}
              onChange={(e) => {
                const newValue = e.target.value;
                setProfileData((prev) => {
                  const updatedProfileData = { ...prev, name: newValue };
                  updateProfileData(updatedProfileData);
                  return updatedProfileData;
                });
              }}
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
              onChange={(e) => {
                const newValue = e.target.value;
                setProfileData((prev) => {
                  const updatedProfileData = { ...prev, bio: newValue };
                  updateProfileData(updatedProfileData);
                  return updatedProfileData;
                });
              }}
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
              onChange={(e) => {
                const newValue = e.target.value;

                setProfileData((prev) => {
                  const updatedProfileData = { ...prev, email: newValue };
                  updateProfileData(updatedProfileData);
                  return updatedProfileData;
                });
              }}
            />
          </div>
          <div className={classes.input_field}>
            <label htmlFor="">Phone</label>
            <input
              type="text"
              placeholder="Phone"
              value={profileData.phone}
              onChange={(e) => {
                const newValue = e.target.value;

                setProfileData((prev) => {
                  const updatedProfileData = { ...prev, phone: newValue };
                  updateProfileData(updatedProfileData);
                  return updatedProfileData;
                });
              }}
            />
          </div>
          <div className={classes.input_field}>
            <label htmlFor="">City</label>
            <input
              type="text"
              placeholder="City"
              value={profileData.city}
              onChange={(e) => {
                const newValue = e.target.value;
                setProfileData((prev) => {
                  const updatedProfileData = { ...prev, city: newValue };
                  updateProfileData(updatedProfileData);
                  return updatedProfileData;
                });
              }}
            />
          </div>
          <div className={classes.input_field}>
            <label htmlFor="">Country</label>
            <input
              type="text"
              placeholder="Country"
              value={profileData.country}
              onChange={(e) => {
                const newValue = e.target.value;
                setProfileData((prev) => {
                  const updatedProfileData = { ...prev, country: newValue };
                  updateProfileData(updatedProfileData);
                  return updatedProfileData;
                });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
