// It formats the date with the virtual property dateFormatted.
// If is needed to format a single message use (x = dateFormat([messages])[0] )

function dateFormat(messages) {
  const formattedMessages = messages.map((message) => {
    return {
      ...message._doc,
      date: message.dateFormatted,
    };
  });

  return formattedMessages;
}

module.exports = dateFormat;
