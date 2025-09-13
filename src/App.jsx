
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
import ProtectedAdminRoute from "./auth/ProtectedAdminRoute.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import AdminLayout from "./Layout/AdminLayout.jsx";
import DashProducts from "./Admin/DashProducts/DashProducts.jsx";
import DashOrders from "./Admin/DashOrders/DashOrders.jsx";
import DashUsers from './Admin/DashUsers/DashUsers';
import DashMessage from "./Admin/DashMessage/DashMessage.jsx";
import DashCategories from "./Admin/DashCategories/DashCategories.jsx";
import BrowesByCategory from "./Pages/BrowesByCategory/BrowesByCategory.jsx";
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
              <Route path="products/category/:id" element={<BrowesByCategory/>}/>
              <Route path="wishlist" element={<Wishlist/>}/>
              <Route path="cart" element={<h1>cart</h1>}/>
              <Route path="user">
                  <Route path="register" element={<Register/>}/>
                  <Route path="login" element={<LogIn/>}/>
                  <Route path="profile" element={<ProtectedRoute  rePath={"/user/register"}> <Profile/> </ProtectedRoute>}/>
              </Route>
              <Route path="admin" element={<AdminLayout/>}>
                  <Route index element={<ProtectedAdminRoute  rePath={"notfound"}> <Dashboard/> </ProtectedAdminRoute>}/>
                  <Route path="categories" element={<ProtectedAdminRoute  rePath={"notfound"}><DashCategories/> </ProtectedAdminRoute>}/>
                  <Route path="products" element={<ProtectedAdminRoute  rePath={"notfound"}> <DashProducts/> </ProtectedAdminRoute>}/>
                  <Route path="orders" element={<ProtectedAdminRoute  rePath={"notfound"}> <DashOrders/> </ProtectedAdminRoute>}/>
                  <Route path="users" element={<ProtectedAdminRoute  rePath={"notfound"}> <DashUsers/> </ProtectedAdminRoute>}/>
                  <Route path="message" element={<ProtectedAdminRoute  rePath={"notfound"}> <DashMessage/> </ProtectedAdminRoute>}/>
              </Route>
              <Route path="*" element={<NotFound/>}/>
          </Route>
      </Routes>
     <ToastContainer />  
    </BrowserRouter>
  )
}

export default App
