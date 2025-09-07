import { Navigate } from "react-router";

function ProtectedRoute({rePath,children}) {
    const userInfo=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null
    if(userInfo.isLoged)return children;
    return <Navigate to={rePath}/>
}

export default ProtectedRoute;