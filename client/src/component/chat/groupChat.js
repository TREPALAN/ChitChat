import { useParams } from "react-router-dom";
import MessageCardList from "../cards/messageCardList";
import { useEffect, useState, useReducer, useRef } from "react";
import api from "../../interceptors/axios";
import MessagesReducer from "../../reducers/GroupMessagesReducer";
import { getSocket, sendGroupMessage } from "../../socket/socket";

function GroupChat() {
  // Set paginate per page
  const paginatePerPage = 20;

  const [Group, setGroup] = useState({});
  const [messages, setMessages] = useReducer(MessagesReducer, []);
  const [newMessage, setNewMessage] = useState("");
  const page = useRef(null);
  const totalpages = useRef(null);
  const [error, setError] = useState("");

  const { groupId } = useParams();

  // Scroll to the bottom after messages are mapped
  if (page.current === 0) {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "instant",
    });
  }

  useEffect(() => {
    // Scroll to the bottom after messages are mapped
    window.scrollTo(0, document.body.scrollHeight);

    async function getGroup() {
      // Load messages and group data
      try {
        const response = await api.get("/chat/groupChat/", {
          params: { groupId, paginatePerPage },
        });
        if (response.status === 200) {
          page.current = 0;
          setGroup(response.data.group);
          totalpages.current = response.data.totalpages;
          setMessages({
            type: "setInitialMessages",
            messages: response.data.messages,
          });
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getGroup();

    // Join group socket
    const socket = getSocket();
    socket.emit("joinRoom", groupId);

    socket.on("receiveGroupMessage" + groupId, (message, username) => {
      setMessages({ type: "messageReceived", messages: [message] });
    });

    // Emit leaveRoom event when tab is closed
    window.addEventListener("beforeunload", () => {
      socket.emit("leaveRoom", groupId);
    });
  }, [groupId]);

  async function sendMessage(event) {
    event.preventDefault();
    if (!newMessage) {
      setError("Please enter a message");
      return;
    }

    try {
      const result = await sendGroupMessage(Group, newMessage);
      if (result) {
        setMessages({ type: "messageSent", messages: [result.result] });
        setNewMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMessages() {
    const nextPage = page.current + 1;
    page.current = nextPage;
    const result = await api.get("/chat/loadGroupMessages/", {
      params: { groupId, page: nextPage, paginatePerPage },
    });
    try {
      if (result.status === 200) {
        totalpages.current = result.data.totalpages;
        setMessages({
          type: "loadOldMessage",
          messages: result.data.messages,
        });
      } else {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>{Group.name}</h1>

      <div>
        {totalpages.current > page.current ? (
          <small onClick={loadMessages} style={{ cursor: "pointer" }}>
            Load more
          </small>
        ) : (
          <small>No more messages</small>
        )}
        {messages.old && <MessageCardList messages={messages.old} />}
        {messages.messages && <MessageCardList messages={messages.messages} />}
        {messages.new && <MessageCardList messages={messages.new} />}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default GroupChat;
