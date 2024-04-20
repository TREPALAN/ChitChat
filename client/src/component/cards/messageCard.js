import "../css/messageCard.css";

function MessageCard({ _id, sender, receiver, date, message, isRead, isNew }) {
  const requestUser = localStorage.getItem("id");
  const messageclass =
    requestUser === sender._id ? "bubble-right" : "bubble-left";

  console.log(requestUser, sender._id, receiver);
  return (
    <div className={messageclass}>
      {requestUser === receiver ? (
        // If the user is the receiver
        <div className="messageCard">
          <div>
            <p>{isNew && "new"}</p>
            <p>{isRead}</p>
          </div>
          <p>{message}</p>
        </div>
      ) : (
        // If the user is the sender
        <div className="messageCard">
          {isRead && <p>visualized</p>}
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default MessageCard;
