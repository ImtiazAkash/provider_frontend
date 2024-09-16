
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const currentUser = sessionStorage.getItem("userName");
console.log(currentUser);

  return currentUser ? children : <Navigate replace to="/login" />;
}