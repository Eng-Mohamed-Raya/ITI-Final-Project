import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/ProductCard/Card";
import QuantityCounter from "../../components/QuantityCounter";
import GetLocation from "../../utilities/GetLocation";
import "./cart.css"
import { AdminContext } from "../../context/AdminContext";
import { useDeleteData } from "../../utilities/DeleteData";
import { BASE_URL } from "../../context/ProductContext";
import { toast } from "react-toastify";
import Loading from './../../components/Loading';
import { useNavigate } from "react-router";

function Cart() {
    const navigate=useNavigate()
    const {cartsData, setCartsData,loading}=useContext(AdminContext)
    const {deleteData}=useDeleteData()
    const [subtotal,setSubTotal]=useState(0)
    useEffect(()=>{
            handelSubTotal()
    },[cartsData])
       
    const handelSubTotal=()=>{
        setSubTotal(0)
        cartsData?.data?.products?.forEach(({productID,quantity})=>{
            setSubTotal((prev)=>prev+(quantity*productID.price))
        })     
        }
    const handelDeleteCart = async (id) => {

        const {  error }  = await deleteData(`${BASE_URL}/carts/${id}`);
            if (error) {
        toast.error(error);
        } else {
            setCartsData((prev) => ({
                ...prev,
                data: {
                ...prev.data,
                products: prev.data.products.filter((item) => item.productID._id !== id)
                }
            }));
            toast.success("Deleted successfully");         
            handelSubTotal()     
        }
        };

    return (
       <div className="container cart-container mb-5" style={{minHeight:"100vh"}}>
            <div className="my-5">
                <GetLocation/>
            </div>
          {loading?<Loading/> :cartsData.data?.products.length>0 ?  <div className="d-flex gap-4 flex-column-reverse flex-lg-row align-items-start  ">
                <div className="w-50 box">
                    <div className="products-container">
                        {  cartsData?.data?.products?.map(({productID,quantity})=>{
                            return <Card key={productID._id} isInCart={true}  _id={productID._id} name={productID.name} price={productID.price} rate={productID.rate} images={productID.images} topIcon={<i className="fa-solid fa-trash"  onClick={()=>handelDeleteCart(productID._id)}></i>}>
                            <span className="mt-3"><QuantityCounter maxValue={productID.stock} initial={quantity}/></span>
                        </Card>
                        })}
                     
                    </div>
                </div>
                <div className="w-50 border rounded-3 py-5 px-5 box">
                    <p className="fs-3 fw-medium text-danger">Order Summary</p>
                    <div className="w-100 overflow-hidden">
                        <img src="/cart/image-summary-order.svg" alt="" style={{width:"100%"}}/>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Subtotal</span>
                        <span>${subtotal}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Shopping</span>
                        <span>$0</span>
                    </div>
                    <hr />
                     <div className="d-flex justify-content-between align-items-center mb-2 fs-4 fw-medium">
                        <span>Total</span>
                        <span>${subtotal+0}</span>
                    </div>
                    <Button name="Check out" className="w-100 fs-4 py-2" handelClick={()=>navigate("/cart/done")}/>
                </div>
            </div>: <div className="center text-center">
                <h1  style={{color:"var(--secondary-color)"}}> Your Cart is empty.</h1>
                <Button className="btn btn-danger py-3 px-4 mt-3 " name="Shopping Now" handelClick={()=>navigate("/products")}/>
            </div>}
           
    </div>);
}

export default Cart;