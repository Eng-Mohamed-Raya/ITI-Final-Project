import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import useConfirm from "../components/CustomToasty/WarningConfirm";
import { toast } from "react-toastify";
import { ProductContext } from "../context/ProductContext";

function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
      const {setWishlistData}=useContext(ProductContext)
const confirm=useConfirm()
  const handleLogout = () => {
     logout()
     toast.success("Loged Out Successfully")
     setWishlistData([])
     navigate("/user/login")
  };

  return (
    <button className="btn btn-link nav-link" onClick={()=>confirm({
          onConfirm: handleLogout,
          message: "Do you really want to logout ?",
          confirmText: "Logout",
          cancelText: "Cancel",
          confirmBtnClass: "btn btn-danger btn-sm",
        })}>
      <i className="fa-solid fa-right-from-bracket" style={{rotate:"180deg"}}></i> LogOut
    </button>
  );
}

export default LogoutButton;
