import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from './../components/Footer/Footer';

function Default() {
    return ( <div className="d-flex flex-column justify-content-between" style={{minHeight:"100vh"}}>
        <div>
              <Header/>
             
                 <Outlet/>
             
        </div>
    
    <Footer/>
    </div>);
}

export default Default;