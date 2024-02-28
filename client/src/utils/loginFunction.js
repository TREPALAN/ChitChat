import api from "../interceptors/axios";

async function LoginFunction({ username, password }) {
  let message = "";

  try {
    // Handle form submit
    const response = await api.post("/login", {
      username,
      password,
    });

    // Handle success
    if (response.status === 200) {
      if (!response.data.token || !response.data.refreshToken) {
        throw new Error("Invalid credentials");
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refresh_token", response.data.refreshToken);
      message = "Login successful";
      return { code: 200, message };
    }
  } catch (error) {
    // Handle error
    console.error(error);
    message = "Invalid credentials";
    return { code: 401, message };
  }
}

export default LoginFunction;
