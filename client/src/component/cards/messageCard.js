function MessageCard({ _id, sender, receiver, date, message, isRead, isNew }) {
  const requestUser = localStorage.getItem("username");
  return (
    <>
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
    </>
  );
}

export default MessageCard;
