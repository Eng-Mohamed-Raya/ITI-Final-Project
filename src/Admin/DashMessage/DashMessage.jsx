import { useContext } from 'react';
import Button from './../../components/Button';
import { AdminContext, BASE_URL } from '../../context/AdminContext';
import { useDeleteData } from './../../utilities/DeleteData';
import { toast } from 'react-toastify';
import useConfirm from '../../components/CustomToasty/WarningConfirm';
import Loading from './../../components/Loading';

function DashMessage() {
    const {contactData,setContactData,loading}=useContext(AdminContext)
    const confirm=useConfirm()
    const {deleteData}=useDeleteData()
   
        const handelDeleteMessage = async (id) => {

        const { data, error }  = await deleteData(`${BASE_URL}/contact/${id}`);
         if (error) {
       toast.error(error);
    } else {
      setContactData((prev) =>({
        ...prev ,
        data:prev.data.filter((item) => item._id !== id)}));
      toast.success(data.message);
    }
      };

    return ( <div className="container">
         {loading && <Loading/>}
        <div className="d-flex align-items-center justify-content-between my-5">
            <h2 className="section-title fs-3">All Message</h2>
        </div>
        <div className="overflow-x-auto">
            {!contactData?.data && !loading? <h1 className='text-center'>Don't have a messages</h1> :
            <table class="table">
            <thead>
                <tr >
                    <th scope="col" style={{color:"var(--secondary-color)"}}>#</th>
                    <th scope="col" style={{color:"var(--secondary-color)"}}>Name</th>
                    <th scope="col" style={{color:"var(--secondary-color)"}}>Email</th>
                    <th scope="col" style={{color:"var(--secondary-color)"}}>Phone</th>
                    <th scope="col" style={{color:"var(--secondary-color)"}}>Message</th>
                    <th scope="col" style={{color:"var(--secondary-color)"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    contactData?.data?.map((user,index)=>{
                        return <tr className='align-middle'>
                            <th scope="row" className="text-danger">{index+1}</th>
                                <td>
                                    {user.userName}
                                </td>
                                <td>{user.email} </td>
                                <td>{user.phone}</td>
                                <td>{user.message}</td>
                                <td>
                                    <i class="fa-solid fa-trash fs-5" role='button' style={{color:"var(--secondary-color)"}} onClick={()=>confirm({
                                        onConfirm: ()=>handelDeleteMessage(user._id),
                                        message: "Do you really want to delete this Message?",
                                        confirmText: "Delete",
                                        cancelText: "Cancel",
                                        confirmBtnClass: "btn btn-danger btn-sm",
                                        })}></i>
                                </td>
                        </tr>
                    })
                }
            </tbody>
        </table> }
        </div>
    </div> );
}

export default DashMessage;