import axios from "axios";

async function LoginFunction({ username, password }) {
  try {
    // Handle form submit
    const response = await axios.post("http://localhost:8000/login", {
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
