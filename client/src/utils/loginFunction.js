import api from "../interceptors/axios";

async function LoginFunction({ username, password }) {
  // Delete any existing tokens
  localStorage.clear();

  // Handle form submit
  let message = "";

  try {
    // Handle form submit
    const response = await api.post("auth/login", {
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
      localStorage.setItem("username", username);
      message = "Login successful";
      return { code: 200, message };
    } else {
      // Handle error
      message = "Invalid credentials";
      return { code: response.status, message: response.data.message };
    }
  } catch (error) {
    // Handle error
    console.error(error);
    message = "Invalid credentials";
    return { code: 401, message };
  }
}

export default LoginFunction;
