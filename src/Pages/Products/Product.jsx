import { useContext } from "react";
import Card from "../../components/ProductCard/Card";
import { ProductContext } from "../../context/ProductContext";

function Products() {
    
    const {data}=useContext(ProductContext);
    return ( <div className="container">
         <div className="category-section "  style={{margin:"50px 0"}}>
            <h2 className="section-title my-5">Products</h2>
            <div className="products-container">
                {data && data?.map((product)=><Card key={product._id} {...product}/>)}
              
             </div>
        </div>
    </div> );
}

export default Products;