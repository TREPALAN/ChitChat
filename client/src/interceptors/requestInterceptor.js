import api from "./axios";

api.interceptors.request.use(
  (config) => {
    // Access and modify the headers before the request is sent
    const authToken = localStorage.getItem("token");
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    // Use the authToken and refreshToken as needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
