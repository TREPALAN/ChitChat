import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

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

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      let isloggedin = localStorage.getItem("token");
      if (!isloggedin) {
        console.error("No token");
        return Promise.reject(error);
      }
      const refresSuccess = await getrefreshToken();
      try {
        return api(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    if (error.response && error.response.status === 409) {
      // Handle conflict error
      return Promise.resolve(error.response);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
  }
);

async function getrefreshToken() {
  // Handle token expiration
  let refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    return Promise.reject(new Error("No refresh token"));
  }
  // Request for new access token
  const response = await api.post("/refresh", {
    refreshToken,
  });
  try {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refresh_token", response.data.refreshToken);
    return Promise.resolve();
  } catch (error) {
    console.error(error);
    return Promise.reject();
  }
}

export default api;
