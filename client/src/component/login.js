import { useState } from "react";
import LoginFunction from "../utils/loginFunction";
import "../component/css/userForm.css";

function Login() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function HandleSubmit(event) {
    event.preventDefault();
    let message = await LoginFunction({ username, password });
    if (message.code === 200) {
      setMessage(message.message);
      window.location.href = "/";
    }
    setMessage(message.message);
  }

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={HandleSubmit}>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              placeholder="username"
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              placeholder="password"
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <alert className="alert alert-danger">{message}</alert>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
