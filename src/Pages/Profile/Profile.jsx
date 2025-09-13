import { useContext, useEffect, useState } from "react";
import GetLocation from "../../utilities/GetLocation";
import Button from './../../components/Button';
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./profile.css"
function Profile() {
       const [user,setUser]=useState({firstName:"",lastName:"",name:"",email:"",gender:"",address:"",image:"",currentPassword:"",newPassword:""})
    const [error,setError]=useState({name:"",email:"",gender:"male",address:"",image:""})
    const [loading,setLoading]=useState(false)
    const {userInfo}=useContext(AuthContext)
    const [isEditabled,setIsEditabled]=useState(false)
   useEffect(()=>{
      
        let postData=async()=>{
            try{
                setLoading(true)
               const {data}= await axios.get(`https://backend-gules-six-47.vercel.app/api/users/profile`,{
                headers: { Authorization: `Bearer ${userInfo?.token}`}
            });
            console.log(data.data)
                 setUser({...data.data,name:`${data.data.firstName} ${data.data.lastName}`})
            }catch(e){
                toast.error(`Error : ${e.response.data.message}`)
            }finally{
                setLoading(false)
            }
        }
        postData();
    },[])
    const handelSubmit=(e)=>{
        e.preventDefault();
        let postData=async()=>{
            try{
                setLoading(true)
                let {firstName,lastName,email,gender,address,image,currentPassword,newPassword}=user || {}
                let {data}=await axios.put(`https://backend-gules-six-47.vercel.app/api/users/profile`,{firstName,lastName,email,gender,address,image,currentPassword,newPassword}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
                 setUser({...data.data,name:`${data.data.firstName} ${data.data.lastName}`})
                 toast.success(`Updated Successfully`)
            }catch(e){
                toast.error(`Error : ${e.response.data.message}`)
                console.log(e)
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
    return ( <div className="container profile-page" style={{minHeight:"100vh"}}>
    <div className="d-flex align-items-center justify-content-between my-5">
        <GetLocation/>
        <div>Welcome!<span className="text-danger "> {user.firstName}</span></div>
    </div>
    <div className="container">
        <div className="upper d-flex flex-column flex-md-row justify-content-between align-items-md-end">
            <div className=" d-flex flex-column flex-md-row justify-content-between  align-items-center gap-4">
                <div className="bg-danger rounded-circle overflow-hidden border border-3" style={{width:"200px"}}>
                   {user.image?  <img src={user.image} alt="empty profile image" className="w-100"/>:<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="empty profile image" className="w-100"/>}
                </div>
                <div className="text-center">
                    <h3 className="fw-bold">{user.name}</h3>
                    <p>{user.email}</p>
                </div>
            </div>
            <Button  handelClick={() => setIsEditabled(!isEditabled)} name={<><i className="fa-solid fa-pen-to-square"></i> {!isEditabled?"Edit":"Cancel"}</>} style={{padding:"10px 48px"}} />
        </div>
        <div className="my-5">
              <form  className="d-flex flex-column gap-3" onSubmit={handelSubmit}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center" >
                    <label htmlFor="name" className="form-label w-50 fs-3  fw-medium" >Your Name :</label>
                    <input type="text" className="form-control py-3 py-3" id="name" name="name" disabled={!isEditabled} value={user.name} onChange={handelInputs}/>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center" >
                    <label htmlFor="exampleInputEmail1" className="form-label w-50 fs-3 fw-medium" >Your Email :</label>
                    <input type="email" className="form-control py-3" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" disabled={!isEditabled} value={user.email} onChange={handelInputs}/>             
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center" >
                    <label htmlFor="gender" className="form-label w-50 fs-3 fw-medium" >Gender :</label>
                    <input type="text" className="form-control py-3 py-3" id="gender" name="gender" disabled={!isEditabled} value={user.gender} onChange={handelInputs}/>
                </div>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center" >
                    <label htmlFor="address" className="form-label w-50 fs-3 fw-medium" >Your Address :</label>
                    <input type="text" className="form-control py-3" id="address" name="address" disabled={!isEditabled} value={user.address} onChange={handelInputs}/>
                </div>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center" >
                    <label htmlFor="password" className="form-label w-50 fs-3 fw-medium" >Old Password :</label>
                    <input type="password" className="form-control py-3" id="password" name="password" disabled={!isEditabled} value={user.password} onChange={handelInputs} placeholder="*********"/>
                </div>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center" >
                    <label htmlFor="newPassword" className="form-label w-50 fs-3 fw-medium" >New Password :</label>
                    <input type="password" className="form-control py-3" id="newPassword" name="newPassword" disabled={!isEditabled} value={user.newPassword} onChange={handelInputs} placeholder="*********"/>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                   {loading?<div className="spinner-border text-danger" role="status"><span className="visually-hidden">Loading...</span></div>:
                 <button type="submit" className="btn btn-danger px-5 py-2" disabled={!isEditabled}>Save</button>}
                </div>
                
            </form>
        </div>
    </div>
    </div> );
}

export default Profile;