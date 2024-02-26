import { useState, useEffect } from "react";
import api from "../interceptors/axios";
import logout from "../utils/logoutFunction";
function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/home").then((res) => setMessage(res.data.message));
  });

  return (
    <div className="App">
      <h1>{message}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
