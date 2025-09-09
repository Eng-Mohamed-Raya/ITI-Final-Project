import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { GetData } from "../utilities/GetData";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext();
export const BASE_URL="https://backend-gules-six-47.vercel.app/api"
export const ProductProvider = ({ children }) => {
   const [data,setData]=useState([])
   const [wishlistData,setWishlistData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [wishlistLoading,setWishlistLoading]=useState(false)
    const {userInfo}=useContext(AuthContext)
    useEffect(()=>{
        const getData=async ()=>{
            setLoading(true)
            setWishlistLoading(true)
            try {
                   const [productsRes, wishlistRes] = await Promise.all([
          axios.get(`${BASE_URL}/products`),
          axios.get(`${BASE_URL}/wishlist`,{headers: {Authorization: `Bearer ${userInfo.token}`,}})
        ]);
                   setData(productsRes.data.data)
                     setWishlistData(wishlistRes.data.data.productId)
            } catch (err) {
                setError(err.message)
            }finally{
                 setLoading(false)
                 setWishlistLoading(false)
            }
         
        }
        getData();
      },[])
   

  return (
    <ProductContext.Provider value={{ data, setData ,error,loading,wishlistData,setWishlistData,wishlistLoading,setWishlistLoading}}>
      {children}
    </ProductContext.Provider>
  );
};
