import { Outlet } from "react-router-dom";

export default function EditProvider() {
  return (
    <>
      <div style={{ borderRadius: "24px", padding: "1rem 1rem" }}>
        <Outlet />
      </div>
    </>
  );
}
