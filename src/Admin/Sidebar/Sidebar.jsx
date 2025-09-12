import { useState } from "react";
import { Link } from "react-router";
import "./sidebar.css" 

function Sidebar() {
    const [isOpen,setIsOpen]=useState(false)
   const handelClose=()=>{
        setIsOpen(!isOpen)
    }
   
    return (  
    <div className="sidebar-container d-flex align-items-start gap-1"  >
       <div id="sidebar" className={`bg-light p-3  border-end ${isOpen || 'd-none'}`} style={{minHeight:"100vh",minWidth:"20vw",zIndex:"100"}}>
           <h2 className="text-center"  ><Link to="/admin" className="text-decoration-none " style={{color:"var(--text-main-color)"}}><i className="fa-solid fa-chart-simple"></i> Dashboard</Link></h2>

            <ul className="d-flex flex-column gap-4 fs-4 mt-5">
                <li><Link to="/admin/categories" className="text-decoration-none" style={{color:"var(--text-main-color)"}}><i className="fa-solid fa-store"></i> Categories</Link></li>
                <li><Link to="/admin/products" className="text-decoration-none" style={{color:"var(--text-main-color)"}}><i className="fa-solid fa-cart-shopping"></i> Products</Link></li>
                <li><Link to="/admin/orders" className="text-decoration-none" style={{color:"var(--text-main-color)"}}><i className="fa-solid fa-truck"></i> Orders</Link></li>
                <li><Link to="/admin/users" className="text-decoration-none" style={{color:"var(--text-main-color)"}}><i className="fa-solid fa-users"></i> Customers</Link></li>
                <li><Link to="/admin/message" className="text-decoration-none" style={{color:"var(--text-main-color)"}}><i className="fa-solid fa-message"></i> Message</Link></li>
            </ul>

       </div>
            
            <i className="fa-solid fa-bars-staggered fs-1 p-3 closeBtn"  style={{left:`${isOpen?'60':"0"}vw`,color:"var(--secondary-color)"}} role="button" onClick={handelClose}></i>
    </div>
   );
}

export default Sidebar;