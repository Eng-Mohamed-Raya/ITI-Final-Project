import Sidebar from "./Sidebar/Sidebar.jsx";
import InfoCard from './../components/InfoCard/InfoCard';
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { ProductContext } from "../context/ProductContext.jsx";
import Loading from "../components/Loading.jsx";


function Dashboard() {
    const getContext=useContext(AdminContext)
    const {usersData,categoriesData,contactData,ordersData,loading}=getContext
    const{data,loading:productLoading}=useContext(ProductContext)
    const [userNum,setUserNum]=useState(0)
    const [categoryNum,setCategoryNum]=useState(0)
    const [productsNum,setProductsNum]=useState(0)
    const [ordersNum,setOrdersNum]=useState(0)
    const [messageNum,setMessageNum]=useState(0)
    useEffect(()=>{

        setUserNum(usersData.totalUsers)
        setCategoryNum(categoriesData.total)
        setProductsNum(data.total)
        setOrdersNum(ordersData?.data?.total)
        setMessageNum(contactData.data?.length)
        
    },[getContext,data])
    return ( <div className="">
         {(loading ||productLoading) && <Loading/>}
      {/* services */}
        <div className="d-flex flex-wrap gap-4 justify-content-center justify-content-lg-start">
         <InfoCard  className="border pt-5"  value={`${categoryNum||0} Category`} img="/aboutImg/Service1.svg"/>
         <InfoCard  className="border pt-5"  value={`${productsNum||0} Product`} img="/aboutImg/Services3.svg"/>
         <InfoCard  className="border pt-5"  value={`${ordersNum||0} Orders`} img="/aboutImg/Services5.svg"/>
         <InfoCard  className="border pt-5"  value={`${userNum||0} User`} img="/aboutImg/Users.svg"/>
         <InfoCard  className="border pt-5"  value={`${messageNum||0} Message`} img="/aboutImg/messagesvg.svg"/>
        </div>
    </div> );
}

export default Dashboard;