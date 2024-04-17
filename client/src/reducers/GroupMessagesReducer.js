const { getSocket } = require("../socket/socket");

function messagesReducer(messages, action) {
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
      if (
        message.readBy.includes(requestUserId) ||
        message.sender._id === requestUserId
      ) {
        return message;
      } else {
        getSocket().emit("markAsReadGroup", message._id, requestUserId);
        return { ...message, isRead: true };
      }
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
        messages: currentMessages.slice(1),
        new: action.messages,
      };

    case "messageSent":
      const Array = currentMessages.slice(1).concat(action.messages);
      return {
        old: null,
        messages: Array,
        new: null,
      };

    default:
      return messages;
  }
}
export default messagesReducer;
