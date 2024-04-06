import { useParams } from "react-router-dom";
import MessageCardList from "../cards/messageCardList";
import { useEffect, useState } from "react";
import api from "../../interceptors/axios";

function GroupChat() {
  // Set paginate per page
  const paginatePerPage = 20;

  const [Group, setGroup] = useState({});
  const [Messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const { groupId } = useParams();

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
  }, []);

  return (
    <>
      <h1>{Group.name}</h1>

      <div>
        {totalpages > page ? (
          <small
            onClick={() => setPage(page + 1)}
            style={{ cursor: "pointer" }}
          >
            Load more
          </small>
        ) : (
          <small>No more messages</small>
        )}
        <MessageCardList messages={Messages} />
      </div>
    </>
  );
}

export default GroupChat;
