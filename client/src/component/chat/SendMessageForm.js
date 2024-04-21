function SendMessageForm(props) {
  const { newMessage, setNewMessage, sendMessage } = props;
  return (
    <form onSubmit={sendMessage} className="sendMessageForm">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter message"
          aria-label="Enter message"
          aria-describedby="basic-addon2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            Button
          </button>
        </div>
      </div>
    </form>
  );
}

export default SendMessageForm;
