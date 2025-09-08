import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { categoryData } from "../../../DB/dbHome";
import InfoCard from "../../components/InfoCard/InfoCard";

import "swiper/css";

export default function HomeCategorySwiper() {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={"auto"}      
      loop={true}                 
      centeredSlides={false}      
      autoplay={{
        delay: 2000,            
        disableOnInteraction: false,
      }}
      speed={1000}                 
      grabCursor={true}
      className="mb-2 w-100"
    >
      {categoryData.map((data, index) => (
        <SwiperSlide 
          key={index} 
          style={{ width: "auto" }}   
        >
          <div className="d-flex align-items-center justify-content-center">
            <InfoCard 
              img={data.img} 
              text={data.category} 
              className={data.className} 
              style={data.style}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
