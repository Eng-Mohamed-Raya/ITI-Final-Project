import { GetData } from "../../utilities/GetData";
import { BASE_URL, ProductContext } from "../../context/ProductContext";
import GetLocation from './../../utilities/GetLocation';
import "./productDetails.css"
import RatingStars from "../RatingStar";
import { useContext, useEffect, useState } from "react";
import { usePostData } from "../../utilities/PostData";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import Loading from "../Loading";
import QuantityCounter from "../QuantityCounter";
import { AdminContext } from "../../context/AdminContext";

function ProductDetails() {
    const {id}=useParams()
    const {data,loading}=GetData(`${BASE_URL}/products/${id}`)
    const {name,description,price,stock,rate,images}=data.data || {}
    const [mainImage, setMainImage] = useState();
    const {postData,error}=usePostData()
     const { setWishlistData } = useContext(ProductContext);
          const { cartsData,setCartsData } = useContext(AdminContext);
     
     useEffect(()=>{
        images && setMainImage(images[0])
     },[images])
    const imageFill=()=>{
        let fill=[]
         fill=images && [...images]
        while(fill?.length<3){
            fill?.push(...images)
        }
        return fill?.slice(0,3)
    }
  
     const handelAddToWishlist = async () => {
            
            const res = await postData(`${BASE_URL}/wishlist/`, { productId: [id] });
            if (res?.message) {
                toast.success(res.message);
                setWishlistData((prev) => [...prev, {  _id:id,name, price, rate ,images }]);
            }
      
    }
     const handelAddToCart=async (id)=>{
        const res = await postData(`${BASE_URL}/carts`, { productID:id,quantity: 1});
        if (res?.message) {
          toast.success(res.message);
          let tempArr=[...cartsData.data.products]
            tempArr.push({quantity:1,productID:{_id:id,name,price,rate,images}})
          setCartsData({...cartsData,data:{...cartsData.data,products:tempArr}});
        }else{
            toast.error(error)
        }
      }
    return ( <div className="container" style={{minHeight:"80vh"}}>
         {loading && <Loading/>}
        <div className="container mt-5">
            <GetLocation/>
            </div> 
             <div className="products-details-container my-5 d-flex flex-column flex-lg-row  align-items-start justify-content-lg-between" >
                {/* {<Card key={id} {...data.data}/>} */}
                <div className="images  d-flex flex-column flex-lg-row align-items-start">
                        <div className="min-cards">
                            {imageFill()?.map((imgSrc,index)=>  <div key={index} className="bg-body-tertiary cursor-pointer" onClick={()=>setMainImage(imgSrc)}><img src={imgSrc} alt={name} /></div>)}
                            {/* {Array.from([3-images.length]).map(()=>  <div  className=" bg-body-tertiary"><img src={images&&images[0]} alt={name} /></div>)} */}
                        </div>
                        <div className="large-image w-100   bg-body-tertiary d-flex justify-content-center align-items-center overflow-hidden">
                            <img src={mainImage} alt={name} />
                        </div>
                </div>
                  <div className="product-details-content h-100 px-3"  >
          <div className="d-flex flex-column ">
            <p className="fw-medium fs-4">{name}</p>

            <div className="d-flex gap-3 align-items-center">
              <span className="text-danger fs-5">${price}</span>
              <span>
                <RatingStars rate={rate} />
              </span>
              <span style={{ color: "var(--text-third-color)" }}>({rate})</span>
            </div>

            <p className="mt-3 text-muted">
             {description}
            </p>

            <hr />
            <div className="d-flex align-items-center gap-2 my-2">
                <span>Colors : </span>
                <span className="bg-danger d-inline-block rounded-circle border border-dark"  style={{width:"15px",height:"15px"}}></span>
                <span className="bg-light d-inline-block rounded-circle border"  style={{width:"15px",height:"15px"}}></span>
            </div>
            <div className="d-flex align-items-center  gap-3 my-2">
                <QuantityCounter maxValue={stock} width="160px"/>
                 <button className="btn btn-danger py-2" style={{width:"160px"}} onClick={()=>handelAddToCart(id)}>By Now</button>
               <span className="cursor-pointer card-icon d-flex justify-content-center align-items-center rounded bg-white border" style={{width:"40px",height:"40px"}}><i className="fa-regular fa-heart fs-4" onClick={handelAddToWishlist}></i></span>

            </div>
            <hr />
            <div className="border my-3">
                <div className="border-bottom d-flex align-items-center gap-1 px-2 py-4">
                    <i className="fa-regular fa-truck fs-3 "></i>
                    <div>
                        <p className="m-0">Free Delivery</p>
                        <p className="m-0">Enter your postal code for Delivery Availability</p>
                    </div>
                </div>
                <div className="border-bottom d-flex align-items-center  gap-1 px-2 py-4">
                   <i className="fa-solid fa-recycle fs-3"></i>
                    <div>
                        <p className="m-0">Return Delivery</p>
                        <p className="m-0">Free 30 Days Delivery Returns. Details</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
             </div>
    </div> );
}

export default ProductDetails;