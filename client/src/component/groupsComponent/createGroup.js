import { useState, useEffect } from "react";
import api from "../../interceptors/axios";

function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedFriendsMessage, setSelectedFriendsMessage] = useState("");

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (!groupName) {
      setMessage("Please enter a group name");
      return;
    }

    // Send data to server
    const response = await api.post("/home/createGroup", {
      name: groupName,
      description: groupDescription,
      members: selectedFriends,
    });
    try {
      if (response.status === 200) {
        const group = response.data.group;
        window.location.href = `/groupChat/${group._id}`;
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleFriendSelect(event) {
    // Handle friend selection here
    event.preventDefault();

    const username = event.target[0].value;
    setSelectedFriendsMessage("");

    if (!username) {
      setSelectedFriendsMessage("Please enter a username");
      return;
    }

    if (!friends.some((friend) => friend.username === username)) {
      setSelectedFriendsMessage("User not found in your friends list");
      return;
    }

    if (selectedFriends.includes(username)) {
      event.target[0].value = "";
      setSelectedFriends(
        selectedFriends.filter((friend) => friend !== username)
      );
    } else {
      setSelectedFriends([...selectedFriends, username]);
      event.target[0].value = "";
    }
  }

  useEffect(() => {
    async function getFriends() {
      const response = await api.get("/home/allFriends");
      if (response.status === 200) {
        setFriends(response.data);
        setMessage("");
      } else {
        setMessage(response.data.message);
        setFriends([]);
      }
    }
    getFriends();
  }, []);
  return (
    <>
      <h3>Create Group</h3>

      <div className="form-group">
        <form onSubmit={handleFormSubmit}>
          {message && <p>{message}</p>}
          <label>Group Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Group Name"
            onChange={(e) => setGroupName(e.target.value)}
          />
          <label>Group Description</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Group Description"
            onChange={(e) => setGroupDescription(e.target.value)}
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Create Group
          </button>
        </form>

        {/* Select Friends to add to the group */}
        <form onSubmit={handleFriendSelect}>
          <label>Add Friends</label>
          <input
            list="friends"
            id="friendsInput"
            className="form-control FriendInput"
          />
          <datalist id="friends">
            {friends.map((friend) => (
              <option key={friend._id} value={friend.username} />
            ))}
          </datalist>

          <button type="submit" className="btn btn-primary">
            Add
          </button>
          {selectedFriendsMessage && <p>{selectedFriendsMessage}</p>}
        </form>

        {selectedFriends ? (
          <p>
            <span>Selected Friends: </span>
            {selectedFriends.map((friend, index) => (
              <span key={index}>
                {friend}
                {index !== selectedFriends.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        ) : (
          <p>No friends selected</p>
        )}
      </div>
    </>
  );
}

export default CreateGroup;
