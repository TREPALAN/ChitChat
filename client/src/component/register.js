import { useState } from "react";
import api from "../interceptors/axios";
import LoginFunction from "../utils/loginFunction";
function Register() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function HandleSubmit(event) {
    event.preventDefault();
    const response = await api.post("/register", {
      username,
      email,
      password,
      confirmPassword,
    });
    if (response.status === 200) {
      alert("User registered successfully");
      let message = await LoginFunction({ username, password });
      if (message.code === 200) {
        setMessage(message.message);
        window.location.href = "/";
      }
      setMessage(message.message);
    }
    console.log(response);
    setMessage(response.data.message);
  }

  return (
    <div>
      <h1>Register</h1>
      <p>{message}</p>
      <form onSubmit={HandleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
