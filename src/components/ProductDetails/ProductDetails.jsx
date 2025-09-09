import { useParams } from "react-router";
import { GetData } from "../../utilities/GetData";
import { BASE_URL } from "../../context/ProductContext";
import Card from "../ProductCard/Card";


function ProductDetails() {
    const {id}=useParams()
    const {data}=GetData(`${BASE_URL}/products/${id}`)
    return ( <div className="container">
    <h1>details</h1>
 <div className="products-container">
                {<Card key={id} {...data.data}/>}
             </div>
    </div> );
}

export default ProductDetails;