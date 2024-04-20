import MessageCard from "./messageCard";
import "../css/messageCardList.css";

function MessageCardList({ messages }) {
  return (
    <div className="messageCardList">
      {messages.map(
        ({ _id, sender, receiver, date, message, isRead, isNew }) => (
          <MessageCard
            key={_id}
            _id={_id}
            sender={sender}
            receiver={receiver?.username} // there is no receiver for group messages
            date={date}
            message={message}
            isRead={isRead}
            isNew={isNew}
          />
        )
      )}
    </div>
  );
}

export default MessageCardList;
