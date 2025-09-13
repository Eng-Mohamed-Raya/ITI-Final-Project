
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export function GetData(url){
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
      const { userInfo } = useContext(AuthContext);
    useEffect(()=>{
        const getData=async ()=>{
            setLoading(true)
            try {
              if(userInfo){
                
                const {data}=await axios.get(url ,{
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${userInfo.token}`,
                    },
                  });
                setData(data)
              }else {
                 const {data}=await axios.get(url ,{
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                setData(data)
              }
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