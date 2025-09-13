import { useContext, useEffect, useState } from "react";
import Card from "../../components/ProductCard/Card";
import { ProductContext } from "../../context/ProductContext";
import Pagination from '../../components/Pagination';
import { useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL} from "../../context/AdminContext";
import SearchAndFilter from "../../components/SearchAndFilter";
import Loading from "../../components/Loading";

function BrowesByCategory() {
    const {id}=useParams()
    const [categoryData,setCategoryData]=useState([])
    const [loading,setLoading]=useState(false)
     const [filter,setFilter]=useState("sortBy")
     const [search,setSearch]=useState("")
       const handelFilter=(e)=>{
                setFilter(e.target.value)
           }
       const handelSearch=(e)=>{
                setSearch(e.target.value)
           }
           const searching=()=>{
              return categoryData?.filter((item)=>{
                    return item?.name?.toLowerCase().startsWith(search.toLowerCase())
                }) ||categoryData
           }
           const filtered=()=>{
            let items=[]
          categoryData ? items=[...categoryData]: items=[]
            if(filter!="sortBy" && search=="" && items){
                    switch(filter){
                        case "name":
                            return  items.sort((a,b)=> a.name.localeCompare(b.name))
                        case "highPrice":
                            return  items.sort((a,b)=>b.price-a.price)
                        case "lowPrice":
                            return  items.sort((a,b)=>a.price-b.price)
                        case "highRate":
                            return  items.sort((a,b)=>b.rate-a.rate)
                        case "lowRate":
                            return  items.sort((a,b)=>a.rate-b.rate)
                    }
                }
              return  searching()
           
        }
        

    useEffect(()=>{
          
        let getData=async()=>{
            setLoading(true)
            try{
               const {data}= await axios.get(`${BASE_URL}/products/category/${id}`);
                 setCategoryData(data.data)
            }catch(e){
                toast.error(`Error : ${e.response.data.message}`)
            }finally{
                setLoading(false)
            }
        }
        getData();
    },[id])
    return ( <div className="container" style={{minHeight:"100vh"}}>
          {loading && <Loading/>}
             <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between my-5 gap-3 ">
            <h2 className="section-title my-5">{ categoryData[0]?.categoryId?.title  || "Category"}</h2>
            {/* search and filter  */}
                <SearchAndFilter handelSearch={handelSearch} searchValue={search} handelFilter={handelFilter}/>
                </div>
              
           {categoryData?  <div className="products-container mb-5">
                {searching()?.length && filtered().length ?filtered()?.map((product)=><Card key={product._id} {...product}/>):<p className='text-center fs-1 fw-medium'> No results</p>}
             </div>
             :<p  className='text-center fs-1 fw-medium'>No products found</p>}
    </div> );
}

export default BrowesByCategory;