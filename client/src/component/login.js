import { useState } from "react";
import LoginFunction from "../utils/loginFunction";

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
