import { useState } from "react";
import axios from "axios";

function Login() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function HandleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
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

  return (
    <>
      <h1>{message}</h1>
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  );
}

export default Login;
