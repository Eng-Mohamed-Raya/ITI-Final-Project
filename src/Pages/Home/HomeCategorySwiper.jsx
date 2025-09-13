import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import InfoCard from "../../components/InfoCard/InfoCard";

import "swiper/css";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function HomeCategorySwiper() {
  const navigate=useNavigate()

  const {categoriesData}=useContext(AdminContext);
  console.log(categoriesData)
  const categoryImage=(categoryTitle)=>{
    switch (categoryTitle) {
    case "Computers":
      return "/homeImg/Category-Computer.svg"
    case "Phones":
      return "/homeImg/Category-CellPhone.svg"
    case "Smart Watches":
      return "/homeImg/Category-SmartWatch.svg"
    case "Headphones":
      return "/homeImg/Category-Headphone.svg"
    case "Electronic":
      return "/homeImg/technology (1).png"
    case "Cameras":
      return "/homeImg/Category-Camera.svg"
    default:
      return "/public/homeImg/responsive.png"
     
  }
}
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={"auto"}      
      loop={true}                 
      centeredSlides={false}      
      autoplay={{
        delay: 2000,            
        disableOnInteraction: false,
      }}
      speed={500}                 
      grabCursor={false}
      className="mb-2 w-100"
    > 
      {categoriesData.data?.map((data, index) => (
        <SwiperSlide 
          key={index} 
          style={{ width: "auto" }}   
        >
          <div className="d-flex align-items-center justify-content-center" onClick={()=>navigate(`/products/category/${data._id}`)}>
            <InfoCard 
              img={categoryImage(data.title)} 
              text={data.title} 
              style={{width: "220px"}}
              className="category-card border py-5 justify-content-evenly "
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
