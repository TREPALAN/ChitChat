import { useState, useRef } from "react";
import api from "../../../interceptors/axios";
import MessageCardList from "../../cards/messageCardList";
import EditGroup from "./editGroup";
import GroupMembers from "./groupMembers";
import { sendGroupMessage } from "../../../socket/socket";

function GroupIFSusses(props) {
  const requestUserId = props.requestUserId;
  const paginatePerPage = props.paginatePerPage;
  const isAdmin = props.isAdmin;
  const Group = props.Group;
  const setGroup = props.setGroup;
  const groupId = props.groupId;
  const messages = props.messages;
  const setMessages = props.setMessages;
  const totalpages = props.totalpages;
  const page = useRef(0);

  if (page.current === 0) {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "instant",
    });
  }

  const [newMessage, setNewMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [menbersTrigger, setMenbersTrigger] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <>
      <h1>{Group.name}</h1>
      {Group.admin.includes(requestUserId.current) && (
        // If user is admin
        <>
          <button onClick={() => setIsEditing(true)}>Edit Group</button>

          <div className="editGroup"></div>
          <EditGroup
            group={Group}
            trigger={isEditing}
            setTrigger={setIsEditing}
            setGroup={setGroup}
          />
        </>
      )}
      <button onClick={() => setMenbersTrigger(true)}>Group Members</button>
      <GroupMembers
        trigger={menbersTrigger}
        groupId={groupId}
        group={Group}
        setGroup={setGroup}
        setTrigger={setMenbersTrigger}
        isAdmin={isAdmin}
      />

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

export default GroupIFSusses;
