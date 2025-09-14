import Button from "./Button";
import { BASE_URL, ProductContext } from "../context/ProductContext";
import Card from "./ProductCard/Card";
import { GetData } from "../utilities/GetData";
import {  useContext } from "react";
import { toast } from "react-toastify";
import { useDeleteData } from "../utilities/DeleteData";
import Loading from './Loading';

function Wishlist() {
    const {wishlistData,setWishlistData,loading}=useContext(ProductContext)
    const {deleteData}=useDeleteData()
   

        const handelDeleteFromWishlist = async (id) => {
        const { data, error }  = await deleteData(`${BASE_URL}/wishlist/${id}`);
         if (error) {
       toast.error(error);
    } else {
      setWishlistData((prev) => prev.filter((item) => item._id !== id));
      toast.success("Deleted successfully");
      console.log(data);
    }
      };
    return (<div className="container" style={{minHeight:"90vh"}}>
       <div className="d-flex align-items-center justify-content-between my-5">
        <h1>Wishlist ({wishlistData.length})</h1> 
        <Button name="Add all to Cart"/>
       </div>
         <div className="products-container ">
                      {loading ? <Loading/> : wishlistData ? wishlistData?.map((product)=><Card key={product._id} {...product}><i className="fa-solid fa-trash"  onClick={()=>handelDeleteFromWishlist(product._id)}></i></Card>)
                       : <h1 className="center" style={{color:"var(--secondary-color)"}}> Your wishlist is empty.</h1>}   
          </div>
    </div>);
}

export default Wishlist;