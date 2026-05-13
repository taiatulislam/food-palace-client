import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_baseUrl,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
