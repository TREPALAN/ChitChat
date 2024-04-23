import { useState, useRef } from "react";
import api from "../../../interceptors/axios";
import MessageCardList from "../../cards/messageCardList";
import EditGroup from "./editGroup";
import GroupMembers from "./groupMembers";
import SendMessageForm from "../SendMessageForm";
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
  const scrollToOldMessage = useRef(null);
  const page = useRef(1);

  if (page.current === 1) {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "instant",
    });
  }
  if (messages.old) {
    scrollToOldMessage.current.scrollIntoView();
  }

  const [newMessage, setNewMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [menbersTrigger, setMenbersTrigger] = useState(false);
  const [error, setError] = useState("");

  async function loadMessages() {
    const result = await api.get("/chat/loadGroupMessages/", {
      params: { groupId, page: page.current, paginatePerPage },
    });
    try {
      if (result.status === 200) {
        totalpages.current = result.data.totalpages;
        page.current = page.current + 1;
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
    <div className="chat">
      <div className="chatHeader">
        <h1>{Group.name}</h1>

        {Group.admin.includes(requestUserId.current) && (
          // If user is admin
          <div>
            <button
              className={
                menbersTrigger
                  ? "disabled" + " btn btn-primary"
                  : "btn btn-primary"
              }
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit Group
            </button>
          </div>
        )}
        <div>
          <button
            className={
              isEditing ? "disabled" + " btn btn-primary" : "btn btn-primary"
            }
            onClick={() => setMenbersTrigger(!menbersTrigger)}
          >
            Group Members
          </button>
        </div>
      </div>

      <div className="chatBodyMessages">
        <div className="loadOldMessages">
          {totalpages.current > page.current ? (
            <small onClick={loadMessages} style={{ cursor: "pointer" }}>
              <strong>Load more</strong>
            </small>
          ) : (
            <small>No more messages</small>
          )}
        </div>

        <div>
          {messages.old && <MessageCardList messages={messages.old} />}
          <div ref={scrollToOldMessage} />

          {messages.messages && (
            <MessageCardList messages={messages.messages} />
          )}

          {messages.new && (
            <>
              <MessageCardList messages={messages.new} />
            </>
          )}
        </div>
      </div>

      <SendMessageForm
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
      />

      {/* Edit Group */}
      <EditGroup
        group={Group}
        trigger={isEditing}
        setTrigger={setIsEditing}
        setGroup={setGroup}
      />

      {/* Group Members */}
      <GroupMembers
        trigger={menbersTrigger}
        groupId={groupId}
        group={Group}
        setGroup={setGroup}
        setTrigger={setMenbersTrigger}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default GroupIFSusses;
