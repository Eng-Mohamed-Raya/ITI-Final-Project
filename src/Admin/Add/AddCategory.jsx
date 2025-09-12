import "../../auth/auth.css"
import {AddCategorySchema} from "../../Schema/Schema"
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from './../../context/ProductContext';
import { AuthContext } from "../../context/AuthContext";
import Modal from "../../components/Modal";
function AddCategory() {
      const [category,setCategory]=useState({title:"",description:""})
    const [error,setError]=useState({title:"",description:""})
    const [loading,setLoading]=useState(false)
    const {userInfo}=useContext(AuthContext)

const handelSubmit=(e)=>{
        e.preventDefault();
        let check=AddCategorySchema.safeParse(category)
        if(!check.success){
            let arrObj={}
            check.error.issues.forEach((err) => {
                arrObj[err.path[0]] = err.message;
            });
            setError(arrObj)
            return
        }
        let postData=async()=>{
            try{
                
                setLoading(true)
                await axios.post(`${BASE_URL}/categories`,category,{
            headers: { Authorization: `Bearer ${userInfo?.token}`}
          });
         
                 setCategory({title:"",description:""})
                 toast.success(`Added Successfully`)
                   
            }catch(e){
                toast.error(`Error : ${e.response?.data?.messages}`)
            }finally{
                setLoading(false)
            }
        }
        postData();
    }
     const handelInputs=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setCategory({...category,[name]:value})
        setError({...error,[name]:""})
    }

    return ( <>
    <Modal id="addCategory" title="Add Category" handelSendBtn={handelSubmit}>
         <div className=" px-3 px-lg-0" >
            
            <p className="py-2 fs-4">Enter Category details below</p>
            <form onSubmit={handelSubmit}>
                <div className="mb-3" >
                    <label htmlFor="title" className="form-label" >Category Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={handelInputs} value={category.title}/>
                    <small className="text-danger">{error.title}</small>
                </div>
                <div className="mb-3" >
                    <label htmlFor="description" className="form-label" >Category Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handelInputs} value={category.description}/>
                    <small className="text-danger">{error.description}</small>
                </div>
            </form>
        </div>
    </Modal>

    {/* <!-- Button trigger modal --> */}
<button type="button" className="btn" style={{backgroundColor:"var(--secondary-color)",color:"var(--text-secondary-color)"}} data-bs-toggle="modal" data-bs-target="#addCategory">
  Add Category
</button>

    </> );
}

export default AddCategory;