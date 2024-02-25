import { useState } from "react";
import axios from "axios";
import LoginFunction from "./loginFunction";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function HandleSubmit(event) {
    event.preventDefault();
    const response = await axios.post("http://localhost:8000/register", {
      username,
      email,
      password,
      confirmPassword,
    });
    if (response.status === 200) {
      alert("User registered successfully");
      LoginFunction({ username, password });
    } else {
      alert(response.data.message);
      console.error("Error registering user");
    }
  }

  return (
    <div>
      <h1>Register</h1>
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
