import { useState } from "react";
import api from "../interceptors/axios";
import UserCard from "./userCard";
function AddFriend() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  async function HandleSubmit(event) {
    event.preventDefault();
    console.log(username);
    const response = await api.get("/SearchFriend", { params: { username } });
    if (response.status === 200) {
      setUsers(response.data);
    }
    setMessage(response.data.message);
  }
  return (
    <>
      <h1>Add Friend</h1>
      <form onSubmit={HandleSubmit}>
        <div className="form-group">
          <input
            placeholder="username"
            type="search"
            className="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-lg">
            Large button
          </button>
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
      </form>
    </>
  );
}

export default AddFriend;
