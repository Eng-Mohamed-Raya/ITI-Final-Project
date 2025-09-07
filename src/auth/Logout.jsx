import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const toastId = toast.warning(
      () => (
        <div className="text-danger fw-medium">
          <p>Are you sure you want to log out?</p>
          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                logout();
                toast.dismiss(toastId);
                toast.success("Logged out successfully");
                navigate("/user/login"); 
              }}
            >
              Confirm
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                toast.dismiss(toastId);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
         position: "top-center" 
      }
   );
  };

  return (
    <button className="btn btn-link nav-link" onClick={handleLogout}>
      <i className="fa-solid fa-right-from-bracket" style={{rotate:"180deg"}}></i> LogOut
    </button>
  );
}

export default LogoutButton;
