import { useState } from "react";
import useIsUserOnline from "../../utils/isUserOnlineHook";
import api from "../../interceptors/axios";
import isFriendWith from "../../icons/isFriendsWith.svg";
import onlineIcon from "../../icons/online.svg";
import offlineIcon from "../../icons/offline.svg";
import personAdd from "../../icons/personAdd.svg";
import personDash from "../../icons/personDash.svg";
import sendPlus from "../../icons/sendPlus.svg";
import envelopeAtFill from "../../icons/envelopeAtFill.svg";
import "../css/userCard.css";

function UserCard({
  id,
  username,
  profilePicture,
  isFriend,
  isRequestSent,
  isRequestReceived,
  hasNewMessage,
}) {
  const online = useIsUserOnline(username);
  const [friend, setFriend] = useState(isFriend);
  const [requestSent, setRequestSent] = useState(isRequestSent);
  const [requestReceived, setRequestReceived] = useState(isRequestReceived);
  const [isFetching, setIsFetching] = useState(false);

  // Accept/Decline friend request
  function acceptFriendRequest(event) {
    event.preventDefault();

    const choise = event.target.value;
    let accept = false;
    if (choise === "accept") {
      accept = true;
    }

    api.post("request/acceptFriend", {
      username,
      accept,
    });
    if (accept) {
      setFriend(!friend);
    }
    setRequestReceived(!requestReceived);
  }

  // Remove friend
  async function removeFriend(event) {
    event.preventDefault();
    const response = await api.post("request/deleteFriend", {
      username,
    });
    if (response.status === 200) {
      setFriend(!friend);
    }
  }

  // Add friend or remove friend

  async function addFriend() {
    // Check if the user is already fetching
    if (isFetching) return;
    setIsFetching(true);

    // Add send friend request
    const response = await api.post("request/sendRequest", {
      username,
    });
    if (response.status === 200) {
      setRequestSent(!requestSent);
      setIsFetching(false);
    } else {
      alert(response.data.message);
    }
  }

  return (
    <div className="card text-bg-light mb-3" key={id}>
      <div className="card-body">
        <h5 className="card-title userCardUsername">{username} </h5>

        {/* Online status */}
        {online ? (
          <div className="online">
            <img src={onlineIcon} alt="online" style={{ width: "10px" }} />{" "}
            online
          </div>
        ) : (
          <div className="offline">
            <img src={offlineIcon} alt="offline" style={{ width: "10px" }} />{" "}
            offline
          </div>
        )}

        <p className="card-text">{profilePicture}</p>

        {/* Friend status */}
        {friend ? (
          <>
            <div className="friend">
              <img src={isFriendWith} alt="friend" /> friend{" "}
              <a href={`/privateChat/${username}`} className="ChatLink">
                <img src={sendPlus} alt="send message" title="send message" />
              </a>
              {hasNewMessage && (
                <div className="newMessage">
                  <img src={envelopeAtFill} alt="new message" /> new message{" "}
                </div>
              )}
            </div>

            <br />

            {/* if the user is the current user */}
            {username === localStorage.getItem("username") ? (
              <div>you</div>
            ) : (
              <div>
                <button
                  className="btn  btn-outline-danger"
                  onClick={removeFriend}
                >
                  <img src={personDash} alt="remove friend" /> remove friend
                </button>
              </div>
            )}
          </>
        ) : // If the user is not a friend

        // If the user is requesting or receiving a friend request
        requestReceived ? (
          <>
            <div className="requestReceived">
              <img src={personAdd} alt="request received" />{" "}
              <small>request received</small>
            </div>

            <br />
            <div className="requestReceivedButtons">
              <button
                className="btn  btn-outline-danger"
                value="decline"
                onClick={acceptFriendRequest}
              >
                <img src={personDash} alt="decline friend request" /> decline
              </button>

              <button
                className="btn  btn-outline-success"
                value="accept"
                onClick={acceptFriendRequest}
              >
                <img src={personAdd} alt="accept friend request" /> accept
              </button>
            </div>
          </>
        ) : requestSent ? (
          <>
            <div className="requestSent">
              <img src={personDash} alt="not friend" />
              <small>request sent</small>
            </div>

            <br />

            <button className="btn  btn-outline-warning" onClick={addFriend}>
              <img src={personDash} alt="add friend" /> Cancel friend request
            </button>
          </>
        ) : (
          <>
            <div className="notFriend">
              <img src={personDash} alt="not friend" />
              <small>not friend</small>
            </div>

            <br />

            <button className="btn btn-outline-primary" onClick={addFriend}>
              <img src={personAdd} alt="add friend" /> Send friend request
            </button>
          </>
        )}
      </div>

      {}
    </div>
  );
}

export default UserCard;
