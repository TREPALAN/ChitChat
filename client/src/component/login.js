import { useState } from "react";
import LoginFunction from "./loginFunction";

function Login() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function HandleSubmit(event) {
    event.preventDefault();
    LoginFunction({ username, password });
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
