import { useState, useEffect } from "react";
import axios from "axios";
import logout from "./logout";
function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/home")
      .then((res) => setMessage(res.data.message));
  });

  return (
    <div className="App">
      <h1>{message}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
