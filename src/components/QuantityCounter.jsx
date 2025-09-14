import { useState } from "react"

function QuantityCounter({initial=1,maxValue=0,minValue=1,width,height}) {
    const [quantity,setQuantity]=useState(initial)

         const handelIncrement=()=>{
        if(quantity < maxValue && maxValue!=0){
            setQuantity(quantity + 1)
        }else if(maxValue==0){
            setQuantity(quantity + 1)
        }
    }
    const handelDecrement=()=>{
        if(quantity > minValue){
            setQuantity(quantity-1)
        }
    }

    return (  <div className="border d-flex align-items-center " style={{height:height||"40px", width:width||"100%"}}>
                <span className="d-flex justify-content-center align-items-center  bg-body-secondary" role="button" style={{width:"25%", height:"100%"}} onClick={handelDecrement}>
                    <i className="fa-solid fa-minus fs-4"></i>
                </span>
                <span className="flex-fill text-center fs-4">{quantity}</span>
                <span className="d-flex justify-content-center align-items-center bg-danger text-light" role="button" style={{width:"25%", height:"100%"}} onClick={handelIncrement}>
                    <i className="fa-solid fa-plus fs-4"></i>
                </span>
            </div> );
}

export default QuantityCounter;