import { GetData } from "../../utilities/GetData";
import { BASE_URL, ProductContext } from "../../context/ProductContext";
import Card from "../ProductCard/Card";
import GetLocation from './../../utilities/GetLocation';
import "./productDetails.css"
import RatingStars from "../RatingStar";
import { useContext, useEffect, useState } from "react";
import { usePostData } from "../../utilities/PostData";
import { toast } from "react-toastify/unstyled";
import { useParams } from "react-router";

function ProductDetails() {
    const {id}=useParams()
    const {data}=GetData(`${BASE_URL}/products/${id}`)
    const {name,description,price,stock,rate,images}=data.data || {}
    const [mainImage, setMainImage] = useState();
    const [quantity,setQuantity]=useState(1)
    const {postData,error}=usePostData()
     const { setWishlistData } = useContext(ProductContext);
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
    const handelIncrement=()=>{
        if(quantity < stock){
            setQuantity(quantity + 1)
        }
    }
    const handelDecrement=()=>{
        if(quantity > 1){
            setQuantity(quantity-1)
        }
    }
     const handelAddToWishlist = async () => {
            
            const res = await postData(`${BASE_URL}/wishlist/`, { productId: [id] });
            if (res?.message) {
                toast.success(res.message);
                setWishlistData((prev) => [...prev, {  _id:id,name, price, rate ,images }]);
            }
      
    }
    return ( <div className="container" style={{minHeight:"80vh"}}>
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
               <div className="border d-flex justify-content-between align-items-center " style={{height:"40px",width:"160px"}} >
                      <span className="h-100  d-flex justify-content-between align-items-center  border-end p-1 "  role="button" onClick={handelDecrement}><i className="fa-solid fa-minus fs-4"></i></span> 
                     <span className="fs-4 p-1">{quantity}</span>
                     <span className="h-100  d-flex justify-content-between align-items-center  bg-danger p-1 text-light" role="button" onClick={handelIncrement}> <i className="fa-solid fa-plus fs-4"></i></span> 
               </div>
                 <button className="btn btn-danger py-2" style={{width:"160px"}}>By Now</button>
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