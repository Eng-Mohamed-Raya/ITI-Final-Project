import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const AdminContext = createContext();
export const BASE_URL = "https://backend-gules-six-47.vercel.app/api";

export const AdminProvider = ({ children }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [cartsData, setCartsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const [usersPage,setUsersPage]=useState(1)
  const [categoryPage,setCategoryPage]=useState(1)

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const requests = {
          categories: axios.get(`${BASE_URL}/categories?page=${categoryPage}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }),
          users: axios.get(`${BASE_URL}/users/allusers?page=${usersPage}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }),
          contact: axios.get(`${BASE_URL}/contact`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }),
          orders: axios.get(`${BASE_URL}/orders`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }),
          carts: axios.get(`${BASE_URL}/carts`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }),
        };

        const results = await Promise.allSettled(
          Object.entries(requests).map(([key, req]) =>
            req.then((res) => ({ key, data: res.data }))
          )
        );

        results.forEach((result) => {
          if (result.status === "fulfilled") {
            switch (result.value.key) {
              case "categories":
                setCategoriesData(result.value.data);
                break;
              case "users":
                setUsersData(result.value.data);
                break;
              case "contact":
                setContactData(result.value.data);
                break;
              case "orders":
                setOrdersData(result.value.data);
                break;
              case "carts":
                setCartsData(result.value.data);
                break;
              default:
                break;
            }
          } else {
            console.warn(`Request failed:`, result.reason.message);
          }
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [userInfo?.token,categoryPage,usersPage]);

  return (
    <AdminContext.Provider
      value={{
        error,
        loading,
        categoriesData,
        setCategoriesData,
        usersData,
        setUsersData,
        contactData,
        setContactData,
        ordersData,
        setOrdersData,
        usersPage,setUsersPage,
        categoryPage,setCategoryPage,
        cartsData, setCartsData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
