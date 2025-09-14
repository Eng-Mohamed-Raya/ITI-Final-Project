import GetLocation from "../../utilities/GetLocation";
import "../../auth/auth.css"
import {AddProductSchema} from "../../Schema/Schema"
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL, ProductContext } from './../../context/ProductContext';
import Button from "../../components/Button";
import { AuthContext } from "../../context/AuthContext";
import { AdminContext } from "../../context/AdminContext";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
function AddProduct() {
      const [product,setProduct]=useState({name:"",description:"",categoryId:"",price:0,stock:0,rate:1,images:[]})
      const [images,setImages]=useState(["","",""])
    const [error,setError]=useState({name:"",description:"",price:"",rate:"",stock:"",images:""})
    const [loading,setLoading]=useState(false)
    const {userInfo}=useContext(AuthContext)
    const {categoriesData}=useContext(AdminContext)

const handelSubmit=(e)=>{
        e.preventDefault();
        let check=AddProductSchema.safeParse(product)
        if(!check.success){
            let arrObj={}
            check.error.issues.forEach((err) => {
            arrObj[err.path[0]] = err.message;
        });
        setError(arrObj)
        return
        }
        if(product.rate>5){
            setError({...error,rate:"Rate Must be less than 6 "});
            return;
        }
       if( product.categoryId=="")product.categoryId=categoriesData?.data[0]?._id
        let postData=async()=>{
            try{
                setLoading(true)
               await axios.post(`${BASE_URL}/products`,product,{
            headers: { Authorization: `Bearer ${userInfo?.token}`}
          });
          
                 setProduct({name:"",description:"",categoryId:"",price:0,stock:0,images:["","",""]})
                 setImages(["","",""])
                 toast.success(`Added Successfully`)
                   
            }catch(e){
                toast.error(`Error : ${e.response.data.message}`)

            }finally{
                setLoading(false)
            }
        }
        postData();
    }
     const handelInputs=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setProduct({...product,[name]:value})
        setError({...error,[name]:""})
    }
    const handelInputsImage=(e,i)=>{
            const name=e.target.name;
            const value=e.target.value;
            let newImages=[...images]
            newImages[i]=value;
            setImages(newImages)
            setProduct({...product,[name]:newImages})
            setError({...error,[name]:""})
    }
    return ( <>
     {loading && <Loading/>}
    <Modal id="addProduct" title="Add Product" handelSendBtn={handelSubmit}>
         <div className=" px-3 px-lg-0" >
            
            <p className="py-2 fs-4">Enter product details below</p>
            <form onSubmit={handelSubmit}>
                <div className="mb-3" >
                    <label htmlFor="name" className="form-label" >Product Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handelInputs} value={product.name}/>
                    <small className="text-danger">{error.name}</small>
                </div>
                <div className="mb-3" >
                    <label htmlFor="description" className="form-label" >Product Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handelInputs} value={product.description}/>
                    <small className="text-danger">{error.description}</small>
                </div>
                <div className="mb-3" >
                    <label htmlFor="stock" className="form-label" >Stock</label>
                    <input type="number" className="form-control" id="stock"  name="stock" onChange={handelInputs} value={product.stock}/>
                     <small className="text-danger">{error.stock}</small>              
                </div>
                <div className="mb-3" >
                    <label htmlFor="price" className="form-label" >Price</label>
                    <input type="text" className="form-control" id="price"  name="price" onChange={handelInputs} value={product.price}/>
                     <small className="text-danger">{error.price}</small>              
                </div>
                <div className="mb-3" >
                    <label htmlFor="rate" className="form-label" >Rate</label>
                    <input type="text" className="form-control" id="rate"  name="rate" onChange={handelInputs} value={product.rate}/>
                     <small className="text-danger">{error.rate}</small>              
                </div>
                <div className="mb-3" >
                    <label htmlFor="category" className="form-label" >Category</label>
                    <select className="form-select" id="category" aria-label="Default select example" name="categoryId" onChange={handelInputs} >
                        {categoriesData.data?.map((category)=>{
                        return <option key={category._id} value={category._id}>{category.title}</option>
                        })}
                    </select>
                </div>
                  <span><label htmlFor="image" className="form-label" >Product images</label></span>  
                 {images.map((_,i)=> <div key={i} className="mb-3" >
                   { i==0?<input type="url" className="form-control" id="image" name="images" onChange={(e)=>handelInputsImage(e,i)} value={images[i]} placeholder={`Enter url of image ${i+1}`} required />:
                    <input type="url" className="form-control" id="image" name="images" onChange={(e)=>handelInputsImage(e,i)} value={images[i]} placeholder={`Enter url of image ${i+1}`} />}
                    <small className="text-danger">{error.images}</small>
                </div>)}    
            </form>
        </div>
    </Modal>

    {/* <!-- Button trigger modal --> */}
<button type="button" className="btn" style={{backgroundColor:"var(--secondary-color)",color:"var(--text-secondary-color)"}} data-bs-toggle="modal" data-bs-target="#addProduct">
  add product
</button>

    </> );
}

export default AddProduct;