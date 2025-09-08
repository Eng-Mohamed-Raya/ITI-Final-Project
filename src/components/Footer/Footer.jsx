import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-dark mt-4 " style={{ minHeight: "40vh" }}>
      <div className="container py-5">
        <div className="row ">
         
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <p className="fs-4 fw-medium">
                <Link className="fw-bold" to="/" >
                Exclusive
                </Link>
            </p>
            <p>Subscribe</p>
            <p>Get 10% off your first order</p>
            <div className="position-relative">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="py-2 px-2 w-75 form-control  "
              />
              <i
                className="fa-regular fa-paper-plane position-absolute text-black fs-5"
                style={{ right: "30%", top: "50%", transform: "translateY(-50%)" }}
              ></i>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <p className="fs-5 fw-medium">Support</p>
            <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <p className="fs-5 fw-medium">Account</p>
            <p><Link to="/user/profile" >My Account</Link></p>
            <p><Link to="/user/register" >Login / Register</Link></p>
            <p><Link to="/cart" >Cart</Link></p>
            <p><Link to="/wishlist" >Wishlist</Link></p>
          </div>

     
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <p className="fs-5 fw-medium">Quick Links</p>
            <p><Link to="/" >Privacy Policy</Link></p>
            <p><Link to="/" >Terms of Use</Link></p>
            <p><Link to="/" >FAQ</Link></p>
            <p><Link to="/contact" >Contact</Link></p>
          </div>

           <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <p className="fs-5 fw-medium">Download App</p>
            <p>Save $3 with App New User Only</p>
            <div className="d-flex align-items-start gap-3">
                <img src="/Qr Code.svg"/>
                <div>
                    <p><Link to="/" > <img src="/public/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.svg"/></Link></p>
                    <p><Link to="/"> <img src="/public/download-appstore.svg"/></Link></p>
                </div>
            </div>
            <div className="d-flex  gap-3">
                <a href=""><i className="fa-brands fa-facebook-f fs-3"></i></a>
                <a href=""><i className="fa-brands fa-linkedin-in"></i></a>
                <a href=""><i className="fa-brands fa-github fs-3"></i></a>
                <a href=""><i className="fa-brands fa-whatsapp fs-3"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
