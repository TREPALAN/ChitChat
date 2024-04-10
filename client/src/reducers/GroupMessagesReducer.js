function messagesReducer(messages, action) {
  // acction ca be messages or id
  const separedMessages = [messages?.old, messages?.messages, messages?.new];
  const currentMessages = separedMessages
    .filter(Boolean)
    .reduce((acc, val) => acc.concat(val), []); // Somethimes is needed to slice to not load same messages in the next request

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
