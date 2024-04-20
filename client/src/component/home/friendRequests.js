import { useEffect, useState } from "react";
import api from "../../interceptors/axios";
import UserCardList from "../cards/userCardList";

function FriendRequests() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Get all friends
    async function getUsers() {
      const response = await api.get("home/friendRequests");
      if (response.status === 200) {
        setUsers(response.data);
        setMessage("");
      } else {
        setMessage(response.data.message);
        setUsers([]);
      }
    }
    getUsers();
  });
  return (
    <div>
      <h1>O Friends</h1>

      {message && <p>{message}</p>}
      {users && <UserCardList users={users} />}
    </div>
  );
}

export default FriendRequests;
