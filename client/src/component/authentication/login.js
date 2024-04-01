import { useState } from "react";
import LoginFunction from "../../utils/loginFunction";
import "../css/userForm.css";

function Login() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function HandleSubmit(event) {
    event.preventDefault();
    let message = await LoginFunction({ username, password });
    setMessage(message);
    if (message.code === 200) {
      window.location.href = "/";
    } else {
      setMessage(message.message);
    }
  }

  return (
    <>
      <h1>Login</h1>

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

          {message && <p className="alert alert-danger">{message}</p>}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
