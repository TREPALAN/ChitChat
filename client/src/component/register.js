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
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    const response = await api.post("/register", {
      username,
      email,
      password,
      confirmPassword,
    });
    if (response.status === 200) {
      let message = await LoginFunction({ username, password });
      if (message.code === 200) {
        window.location.href = "/";
      } else {
        setMessage(message.message);
      }
    }
    console.log(response);
    setMessage(response.data.message);
  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={HandleSubmit} className="userForm">
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              required
              autoComplete="username"
              placeholder="username"
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              required
              autoComplete="email"
              placeholder="email"
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              required
              autoComplete="current-password"
              placeholder="password"
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              required
              autoComplete="current-password"
              placeholder="confirmPassword"
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          {message && <p className="alert alert-danger">{message}</p>}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
