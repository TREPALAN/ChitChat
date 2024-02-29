import axios from "axios";
import "../interceptors/requestInterceptor";
import "../interceptors/responseInterceptor";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export default api;
