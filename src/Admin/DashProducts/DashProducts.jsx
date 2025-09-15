import { useContext, useEffect, useState } from 'react';
import { BASE_URL, ProductContext } from '../../context/ProductContext';
import useConfirm from './../../components/CustomToasty/WarningConfirm';
import { useDeleteData } from '../../utilities/DeleteData';
import { toast } from 'react-toastify';
import Pagination from '../../components/Pagination';
import AddProduct from '../Add/AddProduct';
import { AdminContext } from '../../context/AdminContext';
import UpdateProduct from '../Update/UpdateProduct';
import Loading from './../../components/Loading';

function DashProducts() {
    const {data,setData,productPage,setProductPage,loading}=useContext(ProductContext)
        const [updateData,setUpdateData]=useState(null)
     const {categoriesData}=useContext(AdminContext)
     const [filterCategory,setFilterCategory]=useState("all")
     const [search,setSearch]=useState("")
   const {deleteData}=useDeleteData()
   const confirm=useConfirm()
       const handelDeleteProduct = async (id) => {
              const { data, error }  = await deleteData(`${BASE_URL}/products/${id}`);
               if (error) {
             toast.error(error);
          } else {
           setData((prev) =>({...prev,data:prev.data.filter((item) => item._id !== id)}));
            toast.success("Deleted successfully");
          }
            };

        useEffect(()=>{
             return ()=>{setProductPage(1)}
         },[])
           const handelFilter=(e)=>{
                setFilterCategory(e.target.value)
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
            if(filterCategory!="all" && search==""){
              return data.data?.filter((t)=> t.categoryId?.title==filterCategory)
            }
            return searching()
        }
        
    return ( <div className="container">
         {loading && <Loading/>}
        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between my-5 gap-3 ">
            <h2 className="section-title fs-3">All Products</h2>
                 <form className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between  gap-2" role="search">
                    <div className="d-flex position-relative">
                        <input className="form-control  pe-2" type="text" placeholder="Search By name" aria-label="Search" onChange={handelSearch} value={search}/>
                        <i className="fa-solid fa-magnifying-glass position-absolute" style={{right:"15px",top:"12px"}}></i>
                    </div>
                        <label>or Filter by Category</label>
                        <select id="category" className='fw-light border text-center' style={{padding:"6px 0px",minWidth:"150px" }} name="categoryId" onChange={handelFilter}>
                            <option value="all">All</option>
                            {categoriesData.data?.map((category)=>{
                        return <option key={category._id} value={category.title}>{category.title}</option>
                        })}
                        </select>
                </form>

             <AddProduct/>
        </div>
        <div className="overflow-x-auto">
           { !data?.data && !loading ? <h1 className='text-center'>No products found</h1> : <table className="table">
                <thead>
                    <tr >
                        
                        <th scope="col" style={{color:"var(--secondary-color)"}}>#</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Name</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Category</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>price</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Stock</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Rate</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      searching()?.length && filtered().length || loading ? filtered()?.map((product,index)=>{
                            return <tr key={product._id} className='align-middle'>
                                <th scope="row" className="text-danger">{index+1 + (productPage-1)*10}</th>
                                    <td>
                                        <img src={product.images[0]} alt={product.name} style={{width:"50px",height:"50px"}}/>
                                        <span className='ps-3'>{product.name}</span>
                                    </td>
                                    <td>{product?.categoryId?.title} </td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.rate}</td>
                                     <td>
                                        <i className="fa-solid fa-pen-to-square me-3 fs-5" role='button' style={{color:"var( --text-main-color)"}} data-bs-toggle="modal" data-bs-target="#updateProduct" onClick={()=>setUpdateData(product)}></i>
                                        <UpdateProduct productData={updateData} />
                                        <i className="fa-solid fa-trash fs-5" role='button' style={{color:"var(--secondary-color)"}} onClick={()=>confirm({
                                        onConfirm: ()=>handelDeleteProduct(product._id),
                                        message: "Do you really want to delete this Product?",
                                        confirmText: "Delete",
                                        cancelText: "Cancel",
                                        confirmBtnClass: "btn btn-danger btn-sm",
                                        })}></i>
                                    </td>
                            </tr>
                        }) : <tr className='text-center fs-1 '>
                            <th colSpan="7" className='py-5 border-0 fw-medium'>No results</th>
                            </tr>
                    }
                </tbody>
            </table>
            }
            <div className='my-5'>
                { searching()?.length>0 && filtered().length>0 && data.pages>1 && <Pagination pages={data.pages} setPage={setProductPage} page={productPage}/>}
            </div>
        </div>
    </div> );
}

export default DashProducts;