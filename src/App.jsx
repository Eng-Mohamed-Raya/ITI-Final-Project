
import { BrowserRouter,Routes,Route } from "react-router"

import Default from "./Layout/index.jsx"
import Home from "./Pages/Home/Home.jsx"
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Profile from './Pages/Profile/Profile';
import NotFound from './components/Error/NotFound';
import Register from "./auth/Register.jsx";
import LogIn from "./auth/Login.jsx";
import Wishlist from "./components/Wishlist.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import Products from "./Pages/Products/Product.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Default/>}>
              <Route index element={<Home/>}/>
              <Route path="about" element={<About/>}/>
              <Route path="contact" element={<Contact/>}/>
              <Route path="products" element={<Products/>}/>
              <Route path="products/:id" element={<ProductDetails/>}/>
              <Route path="wishlist" element={<Wishlist/>}/>
              <Route path="cart" element={<h1>cart</h1>}/>
              <Route path="user">
                  <Route path="register" element={<Register/>}/>
                  <Route path="login" element={<LogIn/>}/>
                  <Route path="profile" element={<ProtectedRoute  rePath={"/user/register"}> <Profile/> </ProtectedRoute>}/>
              </Route>
              <Route path="*" element={<NotFound/>}/>
          </Route>
      </Routes>
     <ToastContainer />  
    </BrowserRouter>
  )
}

export default App
