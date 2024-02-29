import api from "../interceptors/axios";

async function getRefreshToken() {
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

export default getRefreshToken;
