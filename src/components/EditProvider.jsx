import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EditProvider() {
  const location = useLocation();
  const { providerName } = location.state;

  const navigate = useNavigate();


  return (
    <>
      <div style={{ borderRadius: "24px", padding: "1rem 1rem" }}>
        <h1>Edit {providerName}</h1>
        <div style={{display: "flex", gap: "1rem", marginBottom: "1rem"}}>
          <button style={{padding: "11px 22px", borderRadius: "10px"}} onClick={()=> navigate("/edit-provider/edit-profile")}>Profile</button>
          <button style={{padding: "11px 22px", borderRadius: "10px"}} onClick={()=> navigate("/edit-provider/edit-language")}>Language</button>
          <button style={{padding: "11px 22px", borderRadius: "10px"}} onClick={()=> navigate("/edit-provider/edit-awards")}>Awards & Recognition</button>
          <button style={{padding: "11px 22px", borderRadius: "10px"}} onClick={()=> navigate("/edit-provider/edit-reviews")}>Reviews</button>
          <button style={{padding: "11px 22px", borderRadius: "10px"}} onClick={()=> navigate("/edit-provider/edit-documents")}>Documents</button>
        </div>
        
        <Outlet />
      </div>
    </>
  );
}
