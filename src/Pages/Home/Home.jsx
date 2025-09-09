import "./home.css"
import HomeVoucherSwiper from "./HomeVoucherSwiper";
import InfoCard from "../../components/InfoCard/InfoCard";
import HomeCategorySwiper from "./HomeCategorySwiper";
import Featured from "./Featured";
import { advantageData } from "../../../DB/dbAbout";
import Card from "../../components/ProductCard/Card";
import Button from './../../components/Button';
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router";


function Home() {
    
       const {data}=useContext(ProductContext);
       const navigate=useNavigate()

    return (<div className="container">
      
        <HomeVoucherSwiper/>
         <hr/>
        <div className="category-section "  style={{marginTop:"100px"}}>
            <p className="section-title ">Category</p>
             <h2 className="mb-5">Browse By Category</h2>
             <HomeCategorySwiper/>
         </div>
        <div className="category-section" style={{margin:"100px 0"}}>
            <p className="section-title ">Our Products</p>
                <h2 className="mb-5">Explore Our Products</h2>
            {/* product component */}
                <div className="container my-3">     
                    <div className="products-container">
                        {data && data?.map((product,index)=>index<8 && <Card key={product._id} {...product}/>)}    
                    </div>
                    <div className="text-center mt-5">
                        <Button name="View All Products" handelClick={()=>navigate("/products")}/>
                    </div>
                 </div>
         </div>
         <hr />
        <div className="category-section" style={{marginTop:"100px"}}>
            <p className="section-title ">Featured</p>
            <h2 className="mb-5">New Arrival</h2>
            <Featured/>
         </div>
         
           {/* advantage */}
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 " style={{margin:"100px 0"}}>
         {advantageData.map((data,index)=>{
          return <InfoCard key={index} {...data}/>
         })}
        </div>
     
    </div>  );
}

export default Home;