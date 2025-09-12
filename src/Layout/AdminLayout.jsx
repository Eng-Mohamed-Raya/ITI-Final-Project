import { Outlet } from "react-router";
import Sidebar from '../Admin/Sidebar/Sidebar';

function AdminLayout() {
    return ( 
    <div className="d-flex" style={{minHeight:"100vh"}}>                
         <Sidebar/>
         <div className="container pt-5">
            <Outlet/>
         </div>
    </div>);
}

export default AdminLayout;