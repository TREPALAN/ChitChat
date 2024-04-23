import { useParams } from "react-router-dom";
import { useEffect, useState, useReducer, useRef } from "react";
import api from "../../../interceptors/axios";
import MessagesReducer from "../../../reducers/GroupMessagesReducer";
import { getSocket } from "../../../socket/socket";
import GroupÍfError from "./groupIfError";
import GroupIFSusses from "./groupIfSusses";
import "../../css/P_G_Chats.css";

function GroupChat() {
  const requestUserId = useRef(localStorage.getItem("id"));
  // Set paginate per page
  const paginatePerPage = 20;

  const [isAdmin, setIsAdmin] = useState(false);
  const [Group, setGroup] = useState({});
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useReducer(MessagesReducer, []);
  const totalpages = useRef(null);
  const [error, setError] = useState("");

  const { groupId } = useParams();

  // Scroll to the bottom after messages are mapped

  useEffect(() => {
    (async function getGroup() {
      // Load messages and group data
      try {
        const response = await api.get("/chat/groupChat/", {
          params: { groupId, paginatePerPage },
        });
        setLoading(false);
        if (response.status === 200) {
          if (response.data.code === 400) {
            // If user is not in this group
            setError(response.data);
            return;
          }
          setGroup(response.data.group);
          setIsAdmin(response.data.isAdmin);
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
    })();

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

  ///// returing jsx/////
  if (error) {
    // If error obs: I'm assuming the user is not in the group
    return <GroupÍfError error={error} />;
  } else if (loading) {
    // If loading
    return (
      <div>
        <div className="d-flex align-items-center isLoading">
          <strong>Loading...</strong>
          <div
            className="spinner-border ml-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    );
  } else {
    return (
      // Render group chat
      <GroupIFSusses
        Group={Group}
        setGroup={setGroup}
        totalpages={totalpages}
        paginatePerPage={paginatePerPage}
        messages={messages}
        setMessages={setMessages}
        groupId={groupId}
        requestUserId={requestUserId}
        isAdmin={isAdmin}
      />
    );
  }
}
export default GroupChat;
