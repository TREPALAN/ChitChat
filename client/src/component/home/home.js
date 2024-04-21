import { useState, useEffect } from "react";
import api from "../../interceptors/axios";
import "../css/home.css";
import chatDot from "../../icons/chatDot.svg";

function Home() {
  const [privateMessages, setPrivateMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);

  useEffect(() => {
    (async function getMessages() {
      try {
        const response = await api.get("/home");
        setPrivateMessages(response.data.privateMessages);
        setGroupMessages(response.data.groupMessages);
        console.log(response.data.groupMessages);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="Home">
      <h1>Home</h1>

      <h3>Notfications</h3>

      {privateMessages.length === 0 && groupMessages.length === 0 && (
        <p>No notifications</p>
      )}

      <div className="HomeNotifications">
        {privateMessages.length > 0 && (
          <div>
            <h5>Private Messages</h5>

            {privateMessages.map((message) => (
              <div key={message.sender._id} className="card">
                <div className="card-body">
                  <strong className="card-title">
                    {message.sender.username}
                  </strong>{" "}
                  <a href={`/privateChat/${message.sender.username}`}>
                    <img src={chatDot} alt="chatDot" />
                  </a>
                  <div className="homepageMessageText card-text">
                    {message.messages.map((message) => {
                      return (
                        <p key={message._id}>
                          <small className="text-muted HomeMessageDate">
                            {message.date}:
                          </small>
                          <small className="HomeMessage">
                            {message.message}
                          </small>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {groupMessages.length > 0 && (
          <div>
            <h5>Group Messages</h5>

            {groupMessages.map(
              (message) =>
                message.messages.length > 0 && (
                  <div key={message.group._id} className="card">
                    <div className="card-body">
                      <strong className="card-title">
                        {message.group.name}
                      </strong>

                      <a href={`/groupChat/${message.group._id}`}>
                        {" "}
                        <img src={chatDot} alt="chatDot" />
                      </a>
                      <div className="homepageMessageText card-text">
                        {message.messages.map((message) => {
                          return (
                            <p key={message._id}>
                              <small className="text-muted HomeMessageDate">
                                {message.date}:
                              </small>

                              <small className="HomeMessageSender">
                                {message.sender.username}
                              </small>
                              <small className="HomeMessage">
                                {message.message}
                              </small>
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
