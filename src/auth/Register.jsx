import { useNavigate } from "react-router";
import "./auth.css"
import {resgisterSchema} from "../Schema/Schema"
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
    const [user,setUser]=useState({name:"",email:"",gender:"male",address:"",image:"",password:"",confirmPassword:""})
    const [error,setError]=useState({name:"",email:"",gender:"male",address:"",image:"",password:"",confirmPassword:""})
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()

const handelSubmit=(e)=>{
        e.preventDefault();
        if(user.password!==user.confirmPassword){
            setError({...error,confirmPassword:"Password and Confirm Password not match"})
            return
        }
        let check=resgisterSchema.safeParse(user)
        if(!check.success){
            let arrObj={}
            check.error.issues.forEach((err) => {
            arrObj[err.path[0]] = err.message;
        });
        setError(arrObj);
        return
        }
        let postData=async()=>{
            try{
                setLoading(true)
                await axios.post(`https://backend-gules-six-47.vercel.app/api/users/register`,user);
                 setUser({name:"",email:"",gender:"male",address:"",image:"",password:"",confirmPassword:""})
                 toast.success(`Register Successfully`)
                 navigate("/user/login")    
            }catch(e){
                toast.error(`Error : ${e.response.data.message}`)
            }finally{
                setLoading(false)
            }
        }
        postData();
    }
     const handelInputs=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value})
        setError({...error,[name]:""})
    }
    return ( 
    <div  className="auth-container align-items-start">
        <div className="img">
            <img src="/registerImg.svg" alt="Auth Image" className="w-100"/>
        </div>
        <div className=" px-3 px-lg-0 form-container " >
            <h3>Register to Exclusive</h3>
            <p className="py-2">Enter your details below</p>
            <form onSubmit={handelSubmit}>
                <div className="mb-3" >
                    <label htmlFor="name" className="form-label" >Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handelInputs} value={user.name}/>
                    <small className="text-danger">{error.name}</small>
                </div>
                <div className="mb-3" >
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handelInputs} value={user.email}/>
                     <small className="text-danger">{error.email}</small>              
                </div>
                <div className="mb-3" >
                    <label htmlFor="gender" className="form-label" >Gender</label>
                    <select className="form-select" id="gender" aria-label="Default select example" name="gender" onChange={handelInputs} >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                  <div className="mb-3" >
                    <label htmlFor="address" className="form-label" >Your Address</label>
                    <input type="text" className="form-control" id="address" name="address" onChange={handelInputs} value={user.address}/>
                    <small className="text-danger">{error.address}</small>
                </div>
                <div className="mb-3" >
                    <label htmlFor="image" className="form-label" >Url of Your Photo</label>
                    <input type="url" className="form-control" id="image" name="image" onChange={handelInputs} value={user.image}/>
                    <small className="text-danger">{error.image}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" >Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handelInputs} value={user.password}/>
                    <small className="text-danger">{error.password}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label" >Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={handelInputs} value={user.confirmPassword}/>
                    <small className="text-danger">{error.confirmPassword}</small>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                   {loading?<div className="spinner-border text-danger" role="status"><span className="visually-hidden">Loading...</span></div>:
                 <button type="submit" className="btn btn-danger px-5 py-2">Sign Up</button>}
                    <div>
                        <span>have account ? </span>
                        <span onClick={()=>navigate("/user/login")} role="button"  className="text-danger">Login</span>
                    </div>  
                </div>
                
            </form>
        </div>
        
    </div> );
}

export default Register;