import { useState, useEffect } from "react";
import api from "../../interceptors/axios";
import "../css/home.css";

function Home() {
  const [privateMessages, setPrivateMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);

  useEffect(() => {
    (async function getMessages() {
      try {
        const response = await api.get("/home");
        setPrivateMessages(response.data.privateMessages);
        setGroupMessages(response.data.groupMessages);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="App">
      <h1>Home</h1>

      <h3>Notfications</h3>

      {privateMessages.length === 0 && groupMessages.length === 0 && (
        <p>No notifications</p>
      )}

      {privateMessages.length > 0 && (
        <div>
          <h5>Private Messages</h5>

          {privateMessages.map((message) => (
            <div key={message.sender._id} className="homepageMessage">
              <strong>{message.sender.username}</strong>{" "}
              <a href={`/privateChat/${message.sender.username}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chat-dots"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                </svg>
              </a>
              <div className="homepageMessageText">
                {message.messages.map((message) => {
                  return <p key={message._id}>{message.message}</p>;
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {groupMessages.length > 0 && (
        <div>
          <h5>Group Messages</h5>

          {groupMessages.map((message) => (
            <div key={message._id} className="homepageMessage">
              <p>{message.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
