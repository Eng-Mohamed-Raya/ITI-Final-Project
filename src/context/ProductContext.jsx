import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext();
export const BASE_URL = "https://backend-gules-six-47.vercel.app/api";

export const ProductProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [productPage,setProductPage]=useState(1)
  const [wishlistPage,setWishlistPage]=useState(1)
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setWishlistLoading(true);

      try {
        const [productsRes, wishlistRes] = await Promise.allSettled([
          axios.get(`${BASE_URL}/products?page=${productPage}`),
          axios.get(`${BASE_URL}/wishlist?page=${wishlistPage}`, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
          }),
        ]);

        if (productsRes.status === "fulfilled") {
          setData(productsRes.value.data);
        } else {
          setError(productsRes.reason.message);
        }

        if (wishlistRes.status === "fulfilled") {
          setWishlistData(wishlistRes.value.data.data.productId);
        } else {
          console.warn("Wishlist request failed:", wishlistRes.reason.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setWishlistLoading(false);
      }
    };

    getData();
  }, [userInfo?.token,productPage,wishlistPage]);

  return (
    <ProductContext.Provider
      value={{
        data,
        setData,
        error,
        loading,
        wishlistData,
        setWishlistData,
        wishlistLoading,
        setWishlistLoading,
       productPage,setProductPage,
       wishlistPage,setWishlistPage
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
