import InfoCard from "../../components/InfoCard/InfoCard";
import TeamCard from "../../components/TeamCard/TeamCard";
import { advantageData, servicesData, teamMembers } from "../../../DB/dbAbout";
import GetLocation from "../../utilities/GetLocation";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination, Autoplay } from "swiper/modules";
import { aboutData } from './../../../DB/dbAbout';
import "./about.css"


function About() {
    return (
       
      <div className="about">
        <div className="container mt-5">
          <GetLocation/>
        </div> 
        <div className="hero d-flex align-items-center justify-content-between ms-auto flex-column flex-lg-row ">
          <div className="content d-flex flex-column gap-3">
            <h3 className="fs-1 fw-bold">{aboutData.title}</h3>
            <p className="mt-4">{aboutData.description.first}</p>
            <p>{aboutData.description.second}</p>
          </div>
          <div className="img">
            <img src="/aboutImg/about-main.svg"  alt="about-main image" />
          </div> 
      </div>
      <div className="container my-5">
        {/* services */}
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
         {servicesData.map((data,index)=>{
          return <InfoCard key={index} {...data}/>
         })}
        </div>
        {/* team member */}
        <div className="my-5">
            <Swiper
                  modules={[Pagination]}
                  spaceBetween={30}
                  slidesPerView={3} 
                  pagination={{
                    clickable: true,          
                  }}
                  loop={true}                  
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                  }}
                >
              
                  {teamMembers.map((member, index) => (
                    <SwiperSlide key={index}>
                      <TeamCard
                        img={member.img}
                        name={member.name}
                        role={member.role}
                        socials={member.socials}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
        </div>
  {/* advantage */}
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 my-5">
         {advantageData.map((data,index)=>{
          return <InfoCard key={index} {...data}/>
         })}
        </div>
      </div>
    </div> );
}

export default About;