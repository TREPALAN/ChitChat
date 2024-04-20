import { getSocket } from "../socket/socket";
function MessagesReducer(messages, action) {
  // acction ca be messages or id
  const separedMessages = [messages?.old, messages?.messages, messages?.new];
  const currentMessages = separedMessages
    .filter(Boolean)
    .reduce((acc, val) => acc.concat(val), []); // Somethimes is needed to slice to not load same messages in the next request
  // Mark as read
  const typesToCheckIfRead = ["setInitialMessages", "messageReceived"];
  if (typesToCheckIfRead.includes(action.type)) {
    const requestUserId = localStorage.getItem("id");
    const messagesArray = Array.isArray(action.messages)
      ? action.messages
      : [action.messages];

    action.messages = messagesArray.map((message) => {
      if (!message.isRead && message.receiver._id === requestUserId) {
        console.log(message._id, message.sender.username);
        getSocket().emit("markAsRead", message._id, message.sender.username);
        return { ...message, isRead: true };
      }
      return message;
    });
  }

  switch (action.type) {
    case "setInitialMessages":
      return { old: null, messages: action.messages, new: null };

    case "loadOldMessage":
      return { old: action.messages, messages: currentMessages, new: null };

    case "messageReceived":
      return {
        old: null,
        messages: currentMessages,
        new: action.messages,
      };

    case "messageSent":
      const Array = currentMessages.concat(action.messages);
      return {
        old: null,
        messages: Array,
        new: null,
      };

    case "setIsRead":
      const messageSetedAsReaded = currentMessages.map((message) => {
        // Here the auctio is an id
        if (message._id === action.id) {
          return { ...message, isRead: true };
        }
        return message;
      });

      return {
        old: null,
        messages: messageSetedAsReaded,
        new: null,
      };

    default:
      return messages;
  }
}

export default MessagesReducer;
