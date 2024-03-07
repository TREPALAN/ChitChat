import api from "../interceptors/axios";
import UserCard from "./userCard";
import { useState, useEffect } from "react";
function AllFriends() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Get all friends
    async function getUsers() {
      const response = await api.get("/allFriends", {
        params: {
          username: localStorage.getItem("username"),
        },
      });
      if (response.status === 200) {
        setUsers(response.data);
        setMessage("");
      } else {
        setMessage(response.data.message);
        setUsers([]);
      }
    }
    getUsers();
  }, []);

  return (
    <div>
      <h1>All Friends</h1>
      {message && <p>{message}</p>}
      {users &&
        users.map(({ id, username, profilePicture }) => (
          <UserCard
            key={id}
            id={id}
            username={username}
            profilePicture={profilePicture}
          />
        ))}
    </div>
  );
}

export default AllFriends;
