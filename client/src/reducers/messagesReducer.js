function MessagesReducer(messages, action) {
  const separedMessages = [messages?.old, messages?.messages, messages?.new];
  const currentMessages = separedMessages
    .filter(Boolean)
    .reduce((acc, val) => acc.concat(val), []); // Somethimes is needed to slice to not load same messages in the next request

  switch (action.type) {
    case "setInitialMessages":
      return { old: null, messages: action.messages, new: null };

    case "loadOldMessage":
      return { old: action.message, messages: currentMessages, new: null };

    case "messageReceived":
      return {
        old: null,
        messages: currentMessages.slice(1),
        new: [action.message],
      };

    case "messageSent":
      const Array = currentMessages.slice(1).concat(action.message);
      return {
        old: null,
        messages: Array,
        new: null,
      };

    case "setIsRead":
      const messageSetedAsReaded = currentMessages.map((message) => {
        // Here the message is an ID
        if (message._id === action.messages) {
          return { ...message, isRead: true };
        }
        return message;
      });

      console.log(messageSetedAsReaded);
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
