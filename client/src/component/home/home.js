import { useState, useEffect } from "react";
import api from "../../interceptors/axios";
function Home() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    (async function getMessages() {
      const response = await api.get("/home");
      setMessages(response.data.messages);
      console.log(response.data.messages);
    })();
  }, []);

  return (
    <div className="App">
      {messages.map((message) => (
        <h1 key={message._id}>
          {message.message} {message.isRead}
        </h1>
      ))}
    </div>
  );
}

export default Home;
