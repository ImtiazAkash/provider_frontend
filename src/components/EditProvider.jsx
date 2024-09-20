import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classes from "../styles/EditProvider.module.css";

export default function EditProvider() {
  const [tab, setTab] = useState("Profile");
  const location = useLocation();
  const { provider } = location.state;

  const navigate = useNavigate();

  return (
    <>
      <div className={classes.editContainer}>
        <h1>Edit {provider.providerName}</h1>
        <div className={classes.navigationButtons}>
          <button
            className={tab === "Profile" ? classes.active : classes.inactive}
            onClick={() => {
              navigate("/edit-provider/edit-profile", {state: {
                provider: provider
              }});
              setTab("Profile");
            }}
          >
            Profile
          </button>
          <button
            className={tab === "Language" ? classes.active : classes.inactive}
            onClick={() => {
              navigate("/edit-provider/edit-language" , {state: {
                provider: provider
              }});
              setTab("Language");
            }}
          >
            Language
          </button>
          <button
            className={tab === "Awards" ? classes.active : classes.inactive}
            onClick={() => {
              navigate("/edit-provider/edit-awards", {state: {
                provider: provider
              }});
              setTab("Awards");
            }}
          >
            Awards & Recognition
          </button>
          <button
            className={tab === "Reviews" ? classes.active : classes.inactive}
            onClick={() => {
              navigate("/edit-provider/edit-reviews", {state: {
                provider: provider
              }});
              setTab("Reviews");
            }}
          >
            Reviews
          </button>
          <button
            className={tab === "Documents" ? classes.active : classes.inactive}
            onClick={() => {
              navigate("/edit-provider/edit-documents", {state: {
                provider: provider
              }});
              setTab("Documents");
            }}
          >
            Documents
          </button>
        </div>

        <Outlet />
      </div>
    </>
  );
}
