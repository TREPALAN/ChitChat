import MessageCard from "./messageCard";
import "../css/messageCardList.css";

function MessageCardList({ messages }) {
  const requestUserId = localStorage.getItem("id");

  return (
    <div className="messageCardList">
      {messages.map(
        ({ _id, sender, receiver, date, message, isRead, isReceived }) => (
          <MessageCard
            key={_id}
            _id={_id}
            sender={sender}
            receiver={receiver?.username} // there is no receiver for group messages
            date={date}
            message={message}
            isRead={isRead}
            requestUserId={requestUserId}
            isReceived={isReceived}
          />
        )
      )}
    </div>
  );
}

export default MessageCardList;
