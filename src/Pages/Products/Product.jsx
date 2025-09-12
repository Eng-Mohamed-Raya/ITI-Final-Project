import { useContext, useEffect, useState } from "react";
import Card from "../../components/ProductCard/Card";
import { ProductContext } from "../../context/ProductContext";
import Pagination from '../../components/Pagination';

function Products() {
    
    const {data,setData,productPage,setProductPage}=useContext(ProductContext);
     const [filter,setFilter]=useState("sortBy")
     const [search,setSearch]=useState("")
       const handelFilter=(e)=>{
                setFilter(e.target.value)
                console.log(filterCategory)
           }
       const handelSearch=(e)=>{
                setSearch(e.target.value)
           }
           const searching=()=>{
              return data.data?.filter((item)=>{
                    return item?.name?.toLowerCase().startsWith(search.toLowerCase())
                }) || data.data
           }
           const filtered=()=>{
            let items=[]
           data.data? items=[...data.data]: items=[]
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
        return ()=>{setProductPage(1)}
    },[])
    return ( <div className="container" style={{minHeight:"80vh"}}>
             <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between my-5 gap-3 ">
            <h2 className="section-title my-5">Products</h2>
             <form className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between  gap-2" role="search" onSubmit={(e)=>e.preventDefault()}>
                    <div className="d-flex position-relative">
                        <input className="form-control  pe-2" type="text" placeholder="Search By name" aria-label="Search" onChange={handelSearch} value={search}/>
                        <i className="fa-solid fa-magnifying-glass position-absolute" style={{right:"15px",top:"12px"}}></i>
                    </div>
                        <select id="filter" className='fw-light border text-center' style={{padding:"6px 0px",minWidth:"150px" }} name="filter" onChange={handelFilter}>
                            <option value="sortBy">Sort by</option>
                            <option value="name">Name</option>
                            <option value="highPrice">High Price</option>
                            <option value="lowPrice">Low Price</option>
                            <option value="highRate">High Rate</option>
                            <option value="lowRate">low Rate</option>
                        </select>
                </form>
                </div>
           {data.data?  <div className="products-container">
                {searching()?.length && filtered().length ?filtered()?.map((product)=><Card key={product._id} {...product}/>):<p className='text-center fs-1 fw-medium'> No results</p>}
             </div>
             :<p  className='text-center fs-1 fw-medium'>No products found</p>}
         <div className='my-5'>
                { searching()?.length>0 && filtered().length>0 && data.pages>1 && <Pagination pages={data.pages} setPage={setProductPage} page={productPage}/>}
            </div>
    </div> );
}

export default Products;