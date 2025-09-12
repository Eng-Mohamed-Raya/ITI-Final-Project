import { useNavigate } from "react-router";
import "./card.css"
import { usePostData } from './../../utilities/PostData';
import { BASE_URL, ProductContext } from "../../context/ProductContext";
import { toast } from "react-toastify";
import { useContext } from "react";
import RatingStars from "../RatingStar";

function Card({_id,name,price,rate,images,children}) {
    const navigate=useNavigate()
    const {postData}=usePostData()
     const { setWishlistData } = useContext(ProductContext);

    const handelAddToWishlist = async (id) => {
    const res = await postData(`${BASE_URL}/wishlist/`, { productId: [id] });
    if (res?.message) {
      toast.success(res.message);
       setWishlistData((prev) => [...prev, { _id, name, price, rate ,images }]);
    }
  };

    return ( <div className="border product-card rounded-3  p-0" >
        <div className="product-img-container bg-body-secondary d-flex justify-content-center align-items-center position-relative" style={{height:"300px",overflow:"hidden"}}>
                <img src={images?.length && images[0]} alt="" className=""/>
              <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
                <span className="cursor-pointer card-icon d-flex justify-content-center align-items-center rounded-circle bg-white" style={{width:"30px",height:"30px"}}>{children||<i className="fa-regular fa-heart" onClick={()=>handelAddToWishlist(_id)}></i>}</span>
                <span className="cursor-pointer card-icon d-flex justify-content-center align-items-center rounded-circle bg-white" style={{width:"30px",height:"30px"}}><i className="fa-solid fa-eye"  onClick={()=>{navigate(`/products/${_id}`) }}></i></span>
              </div>
              <div className="add-to-cart position-absolute bottom-0 text-center start-0 end-0  bg-dark text-light p-1 px-2 rounded-1 opacity-0">
                <span className="fs-5 cursor-pointer" >Add to Cart</span>
             </div>
        </div>
        <div className=" d-flex flex-column justify-content-between p-2">
            <p className="fw-medium">{name} </p>
            <div className="d-flex gap-3">
                <span className="text-danger">${price}</span>
                <span>
                   <RatingStars rate={rate}/>
                </span>
                <span style={{color:"var(--text-third-color)"}}>({rate})</span>
            </div>
        </div>
    </div> );
}

export default Card;