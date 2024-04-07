import MessageCard from "./messageCard";

function MessageCardList({ messages }) {
  return (
    <div>
      {messages.map(
        ({ _id, sender, receiver, date, message, isRead, isNew }) => (
          <MessageCard
            key={_id}
            _id={_id}
            sender={sender.username}
            receiver={receiver.username}
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
