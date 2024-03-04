import api from "./axios";
import getRefreshToken from "../utils/getRefreshToken";
import logout from "../utils/logoutFunction";
// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Handle expired refresh token
      const message = error.response.data.message;
      if (message === "expired refresh token") {
        console.log("expired refresh token");
        logout();
      }

      // Handle unauthorized error
      await getRefreshToken();
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
