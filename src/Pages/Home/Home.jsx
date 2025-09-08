
import "./home.css"
import HomeVoucherSwiper from "./HomeVoucherSwiper";
import InfoCard from "../../components/InfoCard/InfoCard";
import HomeCategorySwiper from "./HomeCategorySwiper";
import Featured from "./Featured";
import { advantageData } from "../../../DB/dbAbout";


function Home() {
    
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