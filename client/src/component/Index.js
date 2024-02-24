import { useState, useEffect } from "react";

function Index() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/home")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default Index;
