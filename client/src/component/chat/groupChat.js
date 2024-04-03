import { useParams } from "react-router-dom";
import MessageCard from "../cards/messageCard";
import { useEffect, useState } from "react";
import api from "../../interceptors/axios";

function GroupChat() {
  const [Group, setGroup] = useState({});
  const [Messages, setMessages] = useState([]);
  const { groupId } = useParams();

  useEffect(() => {
    // Scroll to the bottom after messages are mapped
    window.scrollTo(0, document.body.scrollHeight);

    async function getGroup() {
      // Load messages and group data
      try {
        const response = await api.get("/chat/groupChat/", {
          params: { groupId },
        });
        if (response.status === 200) {
          setGroup(response.data.group);
          setMessages(response.data.messages);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getGroup();
  }, [groupId, Group]);

  return (
    <>
      <h1>{Group.name}</h1>

      <div className="card-group">
        <MessageCard groupId={groupId} messages={Messages} />
      </div>
    </>
  );
}

export default GroupChat;
