import { useParams } from "react-router-dom";
import MessageCard from "../cards/messageCard";
import { useEffect, useState } from "react";
import api from "../../interceptors/axios";

function GroupChat() {
  const [Group, setGroup] = useState({});
  const { groupId } = useParams();
  useEffect(() => {
    async function getGroup() {
      try {
        const response = await api.get("/chat/getGroup/", {
          params: { groupId },
        });
        if (response.status === 200) {
          setGroup(response.data);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getGroup();
  }, []);

  return <h1>Group Chat</h1>;
}

export default GroupChat;
