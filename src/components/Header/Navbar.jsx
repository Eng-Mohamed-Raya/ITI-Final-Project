import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from './../../context/AuthContext';
import LogoutButton from './../../auth/Logout';
import { ProductContext } from "../../context/ProductContext";
import { AdminContext } from "../../context/AdminContext";


function Navbar() {
   
    const { userInfo } = useContext(AuthContext);
    const {wishlistData}=useContext(ProductContext)
        const {cartsData}=useContext(AdminContext)
    
   
    return ( 
       <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container" >
                <Link className="navbar-brand  fs-1 fw-bold " to="/" >Exclusive</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse m-auto" id="navbarSupportedContent" >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-xl-4 ">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        {userInfo?.role=="ADMIN" ? <li className="nav-item"><NavLink className="nav-link" to="/admin">Dashboard</NavLink></li>:
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/contact">Contact</NavLink>
                        </li>}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                             {userInfo?.isLoged ?
                              <LogoutButton/> :
                                <NavLink className="nav-link" to="/user/login">Login</NavLink>
                           }
                        </li>
                    </ul>
                    <div className=" d-lg-flex ms-auto ">

                        <form className="d-flex position-relative mb-3 mb-lg-0" role="search">
                            <input className="form-control me-2 pe-5" type="text" placeholder="Type to search" aria-label="Search"/>
                            <i className="fa-solid fa-magnifying-glass position-absolute" style={{right:"15px",top:"12px"}}></i>
                        </form>
                        <ul className=" navbar-nav mb-2 mb-lg-0 flex-row gap-5 gap-lg-0">
                            {userInfo?.isLoged && userInfo?.role =="USER" &&  <>
                            <li className="nav-item position-relative" title="Wishlist">
                                <NavLink className="nav-link" aria-current="page" to="/wishlist"><i className="fa-solid fa-heart"></i></NavLink>
                                <span className="position-absolute top-0 end-0 text-danger fw-bold">{wishlistData?.length || 0}</span>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link cart-icon" to="/cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className="position-absolute top-0 text-danger fw-bold">{cartsData?.data?.products?.length||0}</span>
                                </NavLink>
                            </li>
                            </>}
                            {userInfo?.isLoged && <li className="nav-item" title="Profile"><NavLink className="nav-link " aria-current="page" to="user/profile"><i className="fa-solid fa-user"></i></NavLink></li>}
                        </ul>
                    </div>
                   
                   
                </div>
            </div>
</nav>
       );
}

export default Navbar;