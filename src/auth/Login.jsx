import { useNavigate } from "react-router";
import "./auth.css"
import {logInSchema} from "../Schema/Schema"
import { useContext, useState } from "react";
import { toast} from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
function LogIn() {
    const [user,setUser]=useState({email:"",password:""})
    const [error,setError]=useState({email:"",password:""})
    const [loading,setLoading]=useState(false)
    const { setUserInfo } = useContext(AuthContext);

    const handelSubmit=(e)=>{
        e.preventDefault();
        let check=logInSchema.safeParse(user)
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
                const {data}=await axios.post(`https://backend-gules-six-47.vercel.app/api/users/login`,user);
                 setUser({email:"",password:""})
               const newUserInfo = {
                isLoged: true,
                token: data.data.token,
                role: data.data.role
                };

            setUserInfo(newUserInfo);
                 toast.success(`Login Successfully`)
                  if(newUserInfo.role=="ADMIN"){
                    navigate("/admin")
                 }else navigate("/")
                 
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

    const navigate=useNavigate()
    return ( <div  className="auth-container ">
    <div className="img">
        <img src="/registerImg.svg" alt="Auth Image" className="w-100"/>
    </div>
    <div className=" px-3 px-lg-0 form-container " >
        <h3>Log in to Exclusive</h3>
        <p className="pb-4 pt-2">Enter your details below</p>
        <form onSubmit={handelSubmit}>
            <div className="mb-3" >
                <label htmlFor="email" className="form-label" >Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={user.email} onChange={handelInputs} />
                <small className="text-danger">{error.email}</small>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label" >Password</label>
                <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handelInputs}/>
                <small className="text-danger">{error.password}</small>

            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
                {loading?<div className="spinner-border text-danger" role="status"><span className="visually-hidden">Loading...</span></div>:
                 <button type="submit" className="btn btn-danger px-5 py-2">Login</button>}
                 <span  onClick={()=>navigate("/user/forgetPassword")} role="button"  className="text-danger">Forget Password?</span>
            </div>
            <div>
                <span>Don't have an account ? </span>
                <span onClick={()=>navigate("/user/register")} role="button"  className="text-danger">Sign up</span>
            </div>
        </form>
    </div>
    
    </div> );
}

export default LogIn;