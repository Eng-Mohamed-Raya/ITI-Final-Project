import { useContext, useEffect } from 'react';
import { AdminContext, BASE_URL } from '../../context/AdminContext';
import Pagination from '../../components/Pagination';
import { useDeleteData } from '../../utilities/DeleteData';
import useConfirm from '../../components/CustomToasty/WarningConfirm';
import { toast } from 'react-toastify';

function DashUsers() {
    const {usersData,setUsersData,usersPage,setUsersPage}=useContext(AdminContext)
   
    
       const {deleteData}=useDeleteData()
       const confirm=useConfirm()
           const handelDeleteUser = async (id) => {
                  const { data, error }  = await deleteData(`${BASE_URL}/users/${id}`);
                   if (error) {
                 toast.error(error);
              } else {
                 console.log(usersData.data);
                setUsersData((prev) => ({
                        ...prev,
                        data: prev.data.filter((item) => item._id !== id)
                        })); 
              toast.success(data.message);
              }
                };
                  useEffect(()=>{
        return ()=>{setUsersPage(1)}
    },[])

    return ( <div className="container">
        <div className="d-flex align-items-center justify-content-between my-5">
            <h2 className="section-title fs-3">All Users</h2>
        </div>
        <div className="overflow-x-auto">
           { ! usersData?.data ? <h1 className='text-center'>No customers</h1> : <table class="table">
                <thead>
                    <tr >
                        <th scope="col" style={{color:"var(--secondary-color)"}}>#</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Name</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Email</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Address</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Gender</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Role</th>
                        <th scope="col" style={{color:"var(--secondary-color)"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersData?.data?.map((user,index)=>{
                            return <tr key={user._id} className='align-middle'>
                                <th scope="row" className="text-danger">{index+1 + (usersPage-1)*10}</th>
                                    <td>
                                        <img src={user.image} alt={user.name} style={{width:"50px",height:"50px"}}/>
                                        <span className='ps-3'>{user.name}</span>
                                    </td>
                                    <td>{user.email} </td>
                                    <td>{user.address}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <i class="fa-solid fa-pen-to-square me-3 fs-5" role='button' style={{color:"var( --text-main-color)"}}></i>
                                          <i class="fa-solid fa-trash fs-5" role='button' style={{color:"var(--secondary-color)"}} onClick={()=>confirm({
                                        onConfirm: ()=>handelDeleteUser(user._id),
                                        message: "Do you really want to delete this User?",
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
                {usersData.totalPages>1&& <Pagination pages={usersData.totalPages} setPage={setUsersPage} page={usersPage}/>}
            </div>
        </div>
    </div> );
}

export default DashUsers;