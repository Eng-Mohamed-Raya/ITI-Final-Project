import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

function Navbar() {
    const [isLog,setIsLog]=useState(JSON.parse(localStorage.getItem("isLog")))
    useEffect(()=>{
       setIsLog(JSON.parse(localStorage.getItem("isLog")))
    },[])
    return ( 
       <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container" >
                <Link className="navbar-brand  fs-1 fw-bold " to="/" >Exclusive</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse m-auto" id="navbarSupportedContent" >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-4 ">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/user/register">SignUp</NavLink>
                        </li>
                    </ul>
                    <div className=" d-lg-flex ms-auto ">

                        <form className="d-flex position-relative mb-3 mb-lg-0" role="search">
                            <input className="form-control me-2 pe-5" type="text" placeholder="What are you looking for?" aria-label="Search"/>
                            <i className="fa-solid fa-magnifying-glass position-absolute" style={{right:"15px",top:"12px"}}></i>
                        </form>
                        <ul className=" navbar-nav mb-2 mb-lg-0 flex-row gap-5 gap-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/wishlist"><i className="fa-solid fa-heart"></i></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link cart-icon" to="/cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className="position-absolute top-0 text-danger fw-bold">2</span>
                                </NavLink>
                            </li>
                            {isLog? <>
                                <li className="nav-item"><NavLink className="nav-link " aria-current="page" to="user/profile"><i className="fa-solid fa-user"></i></NavLink></li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/logout"><i className="fa-solid fa-right-from-bracket"></i></NavLink>
                                </li>
                             </>:" "}
                        </ul>
                    </div>
                   
                   
                </div>
            </div>
</nav>
       );
}

export default Navbar;