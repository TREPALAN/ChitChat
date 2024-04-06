import { useEffect, useState, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import MessageCardList from "../cards/messageCardList";
import api from "../../interceptors/axios";
import { TrackOnlineUser, sendPrivateMessage } from "../../socket/socket";

function MessagesReducer(messages, action) {
  const separedMessages = [messages?.old, messages?.messages, messages?.new];
  const currentMessages = separedMessages
    .filter(Boolean)
    .reduce((acc, val) => acc.concat(val), []);

  switch (action.type) {
    case "setInitialMessages":
      return { old: null, messages: action.messages, new: null };

    case "loadOldMessage":
      console.log("action.message", action.message);
      return { old: action.message, messages: currentMessages, new: null };

    case "messageReceived":
      return { old: null, messages: currentMessages, new: action.message };

    case "messageSent":
      const Array = currentMessages.concat(action.message);
      return {
        old: null,
        messages: Array,
        new: null,
      };

    default:
      return messages;
  }
}

function PrivateChat() {
  // Set paginate per page
  const paginatePerPage = 20;

  const [newMessage, setNewMessage] = useState("");
  const [online, setOnline] = useState(false);
  const [messages, setMessages] = useReducer(MessagesReducer, null);
  const page = useRef(0);
  const [totalpages, setTotalpages] = useState(1);
  const [error, setError] = useState("");
  const { username } = useParams();

  // Scroll to the bottom after messages are mapped
  if (page.current === 0) {
    window.scrollTo(0, document.body.scrollHeight);
  }

  // this effect is supposed to run only once
  useEffect(() => {
    // Track if a user is online

    async function checkOnline() {
      const result = await TrackOnlineUser(username);
      setOnline(result);
    }
    checkOnline();
    // Set an interval
    const interval = setInterval(checkOnline, 5000); // 5000 with the interval time in milliseconds

    // Load existing messages
    async function loadMessages() {
      const currentPage = page.current;
      const result = await api.get("/chat/loadPrivateMessages/", {
        params: { username, currentPage, paginatePerPage },
      });
      try {
        if (result.status === 200) {
          setTotalpages(result.data.totalpages);
          setMessages({
            type: "setInitialMessages",
            messages: result.data.messages,
          });
        } else {
          console.log(result.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadMessages();

    return () => {
      clearInterval(interval); // Clean up the interval when the component is unmounted
    };
  }, [username]);

  async function loadOldMessages() {
    const currentPage = page.current + 1;
    page.current = currentPage;

    const result = await api.get("/chat/loadPrivateMessages/", {
      params: { username, currentPage, paginatePerPage },
    });
    try {
      if (result.status === 200) {
        setMessages({ type: "loadOldMessage", message: result.data.messages });
      } else {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function sendMessage(event) {
    event.preventDefault();
    if (!newMessage) {
      setError("Please enter a message");
      return;
    }

    const result = await sendPrivateMessage(username, newMessage);

    event.target.reset();
    setMessages({ type: "messageSent", message: result.result });
    setNewMessage("");
  }

  return (
    <div>
      {online ? <p>Online</p> : <p>Offline</p>}
      <h1>Private Chat</h1>
      {/* Display messages */}
      {messages && (
        <>
          {totalpages > page.current ? (
            <small onClick={loadOldMessages} style={{ cursor: "pointer" }}>
              Load more
            </small>
          ) : (
            <small>No more messages {totalpages}</small>
          )}
          {messages.old && <MessageCardList messages={messages.old} />}
          <MessageCardList messages={messages.messages} />
          {messages.new && <MessageCardList messages={messages.new} />}
        </>
      )}

      {/* Send a message */}
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default PrivateChat;
