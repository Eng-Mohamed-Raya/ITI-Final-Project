import { Navigate } from "react-router";

function ProtectedAdminRoute({rePath,children}) {
    const userInfo=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null
    if(userInfo?.isLoged && userInfo?.role?.toUpperCase()=="ADMIN" )return children;
    return <Navigate to={rePath}/>
}

export default ProtectedAdminRoute;