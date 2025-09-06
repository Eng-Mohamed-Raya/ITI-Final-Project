
import { useEffect, useState } from "react";
import api from "./api";

export function GetData(url){
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    useEffect(()=>{
        const getData=async ()=>{
            setLoading(true)
            try {
                   const {data}=await api.get(url);
                   setData(data)
            } catch (err) {
                setError(err.message)
            }finally{
                 setLoading(false)
            }
         
        }
        getData();
    },[url])
    return {data,error,loading}
}