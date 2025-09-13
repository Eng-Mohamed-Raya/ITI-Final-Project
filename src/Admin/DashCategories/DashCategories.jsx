import { useContext, useEffect, useState } from 'react';
import { BASE_URL, ProductContext } from '../../context/ProductContext';
import { AdminContext } from '../../context/AdminContext';
import { useDeleteData } from '../../utilities/DeleteData';
import { toast } from 'react-toastify';
import useConfirm from '../../components/CustomToasty/WarningConfirm';
import Pagination from '../../components/Pagination';
import AddCategory from './../Add/AddCategory';
import UpdateCategory from '../Update/UpdateCategory';
import Loading from './../../components/Loading';


function DashCategories() {
    const {categoriesData,setCategoriesData,categoryPage,setCategoryPage,loading}=useContext(AdminContext)
    const [updateData,setUpdateData]=useState(null)
    const {deleteData}=useDeleteData()
 const confirm=useConfirm()
     const handelDeleteCategory = async (id) => {
            const { data, error }  = await deleteData(`${BASE_URL}/categories/${id}`);
             if (error) {
           toast.error(error);
        } else {
        //   setCategoriesData((prev) =>prev?.filter((item) => item._id !== id));
           setCategoriesData((prev) =>({
        ...prev ,
        data:prev.data.filter((item) => item._id !== id)}));
          toast.success("Deleted successfully");
          console.log(data);
        }
          };
            useEffect(()=>{
        return ()=>{setCategoryPage(1)}
    },[])

return ( <div className="container">
            {loading && <Loading/>}
        <div className="d-flex align-items-center justify-content-between my-5">
            <h2 className="section-title fs-3">All Category</h2>
           <AddCategory/>
        </div>
        <div className="overflow-x-auto">
           { !categoriesData?.data && !loading? <h1 className='text-center'>No Category found </h1> : <table class="table">
                <thead>
                    <tr >
                        <th scope="col" style={{color:"var(--secondary-color)"}}>#</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Name</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Description</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categoriesData?.data?.map((category,index)=>{
                            return <tr key={category._id} className='align-middle'>
                                <th scope="row" className="text-danger">{index+1 + (categoryPage-1)*10}</th>
                                    <td>
                                        <span >{category.title}</span>
                                    </td>
                                    <td>{category?.description} </td>
                                    <td>
                                        <i className="fa-solid fa-pen-to-square me-3 fs-5" role='button' style={{color:"var( --text-main-color)"}} data-bs-toggle="modal" data-bs-target="#updateCategory" onClick={()=>setUpdateData(category)}></i>
                                        <UpdateCategory data={updateData} />
                                       <i class="fa-solid fa-trash fs-5" role='button' style={{color:"var(--secondary-color)"}} onClick={()=>confirm({
                                        onConfirm: ()=>handelDeleteCategory(category._id),
                                        message: "Do you really want to delete this Category?",
                                        confirmText: "Delete",
                                        cancelText: "Cancel",
                                        confirmBtnClass: "btn btn-danger btn-sm",
                                        })}></i>
                                    </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            }
              <div className='my-5'>
                {categoriesData.pages>1&& <Pagination pages={categoriesData.pages} setPage={setCategoryPage} page={categoryPage}/>}
            </div>
        </div>
    </div> );
}

export default DashCategories;