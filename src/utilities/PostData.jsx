// utilities/PostData.js
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export function usePostData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(AuthContext);

  const postData = async (url, body) => {
    setLoading(true);
    try {
        
      const { data } = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setData(data);
      return data; 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
}
