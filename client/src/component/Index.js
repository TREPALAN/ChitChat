import { useState, useEffect } from "react";
import axios from "axios";

function Index() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/home")
      .then((res) => setMessage(res.data.message));
  });

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default Index;
