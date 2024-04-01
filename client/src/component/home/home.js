import { useState, useEffect } from "react";
import api from "../../interceptors/axios";
function Home() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    api.get("/home").then((res) => setMessage(res.data.message));
  });

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default Home;
