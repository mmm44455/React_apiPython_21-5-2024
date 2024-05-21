import axios from "axios";
const BASE_HOST = "http://127.0.0.1:8000/";

const axiosClient = axios.create({
  baseURL: BASE_HOST
});

export default axiosClient;
