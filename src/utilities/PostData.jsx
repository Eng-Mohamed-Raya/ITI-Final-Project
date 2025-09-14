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
      const res = await axios.post(url, JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setData(res.data);
      return res.data; 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
}
