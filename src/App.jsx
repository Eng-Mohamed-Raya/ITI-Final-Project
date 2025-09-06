
import { BrowserRouter,Routes,Route } from "react-router"

import Default from "./Layout/index.jsx"
import Home from "./Pages/Home/Home.jsx"
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
// import Profile from './Pages/Profile/Profile';
import NotFound from './components/Error/NotFound';
// import Register from "./auth/Register.jsx";
// import LogIn from "./auth/Login.jsx";
import Wishlist from "./components/Wishlist.jsx";
// import ProtectedRoute from "./auth/ProtectedRoute.jsx";
function App() {
  let isLog=false;
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Default/>}>
              <Route index element={<Home/>}/>
              <Route path="about" element={<About/>}/>
              <Route path="contact" element={<Contact/>}/>
              <Route path="wishlist" element={<Wishlist/>}/>
              <Route path="cart" element={<h1>cart</h1>}/>
              <Route path="user">
                  {/* <Route path="register" element={<Register/>}/> */}
                  {/* <Route path="login" element={<LogIn/>}/> */}
                  {/* <Route path="profile" element={<ProtectedRoute isLoged={isLog} rePath={"/user/register"}> <Profile/> </ProtectedRoute>}/> */}
              </Route>
              <Route path="*" element={<NotFound/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
