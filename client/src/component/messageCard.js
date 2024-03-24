function MessageCard({ _id, sender, receiver, date, message, isRead, isNew }) {
  return (
    <div>
      <div className="messageCard">
        <div>
          <p>{isNew && "new"}</p>
          <p>{isRead}</p>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default MessageCard;
