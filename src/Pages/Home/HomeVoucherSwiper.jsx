import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import { Link } from "react-router";
import { voucherData } from "../../../DB/dbHome";



export default function HomeVoucherSwiper() {
  return (
 <Swiper
  modules={[Pagination, Autoplay]}
  spaceBetween={20}
  slidesPerView={1}
  pagination={{ clickable: true }}
  autoplay={{
    delay:4000,
    disableOnInteraction: false,
  }}
  loop={true}
  className="voucher-swiper h-50 mb-2"
>
  {voucherData.map((item, index) => (
    <SwiperSlide key={index}>
      <div 
        className="border d-flex flex-column flex-md-row justify-content-between p-0 p-lg-5 text-light bg-black w-100 mx-auto my-5 rounded-4 position-relative"
       
      >
        
        <div className=" d-flex flex-column justify-content-center gap-4 p-3 px-lg-5">
          <div className="d-flex align-items-center gap-3">
            <img src={item.logo} alt="" className="img-fluid" style={{maxWidth:"60px"}} />
            <span className="fs-4">{item.title}</span>
          </div>
          <h3 className="fs-1">{item.offer}</h3>
          <Link to="/" className="text-light">
            Shop Now <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

      
        <div className="voucher-img d-flex justify-content-center align-items-center mt-4 mt-md-0  overflow-hidden object-fit-contain px-lg-5">
          <img 
            src={item.img} 
            alt="voucher img" 
            style={{width:"auto",height:"400px"}} 
          />
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

  );
}
