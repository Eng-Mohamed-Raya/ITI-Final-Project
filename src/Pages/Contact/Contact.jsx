import { useState } from "react";
import GetLocation from "../../utilities/GetLocation";
import { contactSchema } from "../../Schema/Schema";
import axios from "axios";
import { BASE_URL} from "../../context/AdminContext";
import { toast } from "react-toastify";
import "./contact.css"
function Contact() {
  const [contactData,setContactData]=useState({userName:"",email:"",phone:"",message:""})
      const [error,setError]=useState({userName:"",email:"",phone:"",message:""})

  const handelInputs=(e)=>{
    setContactData({...contactData,[e.target.name]:e.target.value})
     setError({userName:"",email:"",phone:"",message:""})
  }
  const handelSubmit=(e)=>{
      e.preventDefault();
         let check=contactSchema.safeParse(contactData)
              if(!check.success){
                  let arrObj={}
                  check.error.issues.forEach((err) => {
                  arrObj[err.path[0]] = err.message;
              });
              setError(arrObj);
              return
              }
              console.log("sssss")
            let addMsg=async()=>{
                try {
                    await axios.post(`${BASE_URL}/contact`,contactData,{headers: {"Content-Type": "application/json"}})
                    toast.success("Message sended Successfully")
                    setContactData({userName:"",email:"",phone:"",message:""})
                    setError({userName:"",email:"",phone:"",message:""})
                } catch (error) {
                  toast.error(error)
                }
            }
            addMsg()
  }
    return ( <div className="container contact-container" style={{minHeight:"100vh"}}>
    <div className="my-5">
        <GetLocation/>
    </div>
    <div className=" d-flex flex-column flex-lg-row justify-content-between align-items-start">
      <div className="content d-flex flex-column gap-3 w-25">
          <div>
            <span className="bg-danger rounded-circle d-inline-flex justify-content-center align-items-center fs-5 me-3 text-light" style={{width:"35px",height:"35px"}}><i class="fa-solid fa-phone"></i></span>
            <span className="fs-5">Call To Us</span>
          </div>
          <div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>
          <hr className="m-0"/>
          <div>
            <span className="bg-danger rounded-circle d-inline-flex justify-content-center align-items-center fs-5 me-3 text-light" style={{width:"35px",height:"35px"}}><i class="fa-regular fa-envelope"></i></span>
            <span className="fs-5">Write To US</span>
          </div>
          <div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </div>
      </div>
      <div className="content " style={{width:"60%"}}>
          <form className="d-flex flex-column gap-4" onSubmit={handelSubmit}>
            <div className="d-flex flex-column justify-content-between align-items-center flex-lg-row gap-2">
              <input type="text" className="form-control py-3" placeholder="Your Name *" name="userName" value={contactData.userName} onChange={handelInputs}/>
              <input type="email" className="form-control py-3" placeholder="Your Email *" name="email" value={contactData.email} onChange={handelInputs}/>
              <input type="text" className="form-control py-3" placeholder="Your Phone *" name="phone" value={contactData.phone} onChange={handelInputs}/>
            </div>
            <textarea name="message" id="message" placeholder="Your Message *" className="form-control " style={{height:"220px"}} value={contactData.message} onChange={handelInputs}></textarea>
            <small className="text-danger">{error.userName || error.email || error.phone || error.message}</small>
            <div className="text-end">
              <button className="btn btn-danger">Send Message</button>
            </div>
          </form>
      </div>
    </div>
    </div> );
}

export default Contact;