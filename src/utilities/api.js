import axios from "axios";
import { useContext } from "react";
import { AuthContext } from './../context/AuthContext';


const api = axios.create();
api.interceptors.request.use((config) => {
  const token = Token(); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
function Token(){
  const {userInfo}=useContext(AuthContext)
  return userInfo.token
}

export default api;
