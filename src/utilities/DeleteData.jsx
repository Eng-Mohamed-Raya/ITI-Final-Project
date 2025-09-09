// utilities/DeleteData.js
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useDeleteData() {
  const { userInfo } = useContext(AuthContext);

  const deleteData = async (url) => {
    try {
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  };

  return { deleteData };
}
