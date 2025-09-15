import "../../auth/auth.css"
import {AddCategorySchema} from "../../Schema/Schema"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from './../../context/ProductContext';
import { AuthContext } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import { AdminContext } from "../../context/AdminContext";
import Loading from "../../components/Loading";
function UpdateCategory({data}) {
      const [category,setCategory]=useState({_id:"",title:"",description:""})
    const [error,setError]=useState({title:"",description:""})
    const [loading,setLoading]=useState(false)
    const {userInfo}=useContext(AuthContext)
    const {setCategoriesData,}=useContext(AdminContext)
useEffect(() => {
  if (data) {
    setCategory({
        ...data,
      title: data.title || "",
      description: data.description || "",
    });
    
  }
}, [data]);

   
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
        let updateData=async()=>{
            try{
                setLoading(true)
               let tempObj = {};
                if (category.title !== data.title) {
                tempObj.title = category.title;
                }
                if (category.description !== data.description) {
                tempObj.description = category.description;
                }
                if (Object.keys(tempObj).length === 0) {
                toast.error("you did not update anything");
                return;
                }
              await axios.put(`${BASE_URL}/categories/${category._id}`,tempObj,{
            headers: { Authorization: `Bearer ${userInfo?.token}`}
          });
            setCategoriesData((prev) =>({
            ...prev ,
            data:prev.data.map((item) =>{
                if(item._id == category._id){
                    return category
                }return item
            })}));
                 setCategory({_id:"",title:"",description:""})
                 toast.success(`Updated Successfully`)
                   
            }catch(e){
                toast.error(`Error : ${e.response?.data?.messages}`)
            }finally{
                setLoading(false)
            }
        }
        updateData();
    }
     const handelInputs=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setCategory({...category,[name]:value})
        setError({...error,[name]:""})
    }

    return ( <>
     {loading && <Loading/>}
    <Modal id="updateCategory" title="Update Category" handelSendBtn={handelSubmit} >
         <div className=" px-3 px-lg-0" >
            
            <p className="py-2 fs-4">Enter Category details below</p>
            <form onSubmit={handelSubmit}>
                <div className="mb-3" >
                    <label htmlFor="title" className="form-label" >Category Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={handelInputs} value={category?.title}/>
                    <small className="text-danger">{error.title}</small>
                </div>
                <div className="mb-3" >
                    <label htmlFor="description" className="form-label" >Category Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handelInputs} value={category?.description}/>
                    <small className="text-danger">{error.description}</small>
                </div>
            </form>
        </div>
    </Modal>

    </> );
}

export default UpdateCategory;