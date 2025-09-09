import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./index.css"
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
  </AuthProvider>
  </StrictMode>,
)
