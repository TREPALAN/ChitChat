import api from "../interceptors/axios";

async function LoginFunction({ username, password }) {
  try {
    // Handle form submit
    const response = await api.post("/login", {
      username,
      password,
    });
    if (response.status === 200) {
      if (!response.data.token || !response.data.refreshToken) {
        throw new Error("Invalid credentials");
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refresh_token", response.data.refreshToken);
      window.location.href = "/";
    }
  } catch (error) {
    // Handle error
    console.error(error);
  }
}

export default LoginFunction;
