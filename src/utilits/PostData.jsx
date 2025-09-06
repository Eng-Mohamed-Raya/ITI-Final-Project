
import { useEffect, useState } from "react";
import api from "./api";

export function GetData(url,data){
    const [response,setResponse]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    useEffect(()=>{
        const getData=async ()=>{
            setLoading(true)
            try {
                   const {data}=await api.post(url,data);
                   setResponse(data)
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