
import { useContext, useEffect, useState } from "react";
import api from "./api";
import { AuthContext } from "../context/AuthContext";

export function UpdateData(url,data){
    const [response,setResponse]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
        const {userInfo}=useContext(AuthContext)
    useEffect(()=>{
        const getData=async ()=>{
            setLoading(true)
            try {
                   const res=await api.put(url,data,{
            headers: { Authorization: `Bearer ${userInfo?.token}`}
          });
                   setResponse(res)
            } catch (err) {
                setError(err.message)
            }finally{
                 setLoading(false)
            }
         
        }
        getData();
    },[url,data])
    return {response,error,loading}
}