import "../css/messageCard.css";
import check2AllBlue from "../../icons/check2AllBlue.svg";
import check2AllRed from "../../icons/check2AllRed.svg";
import check2AllBlur from "../../icons/check2AllBlur.svg";

function MessageCard({
  _id,
  sender,
  receiver,
  date,
  message,
  isRead,
  requestUserId,
  isReceived,
}) {
  const messageclass =
    requestUserId === sender._id ? "bubble-right" : "bubble-left";
  return (
    <div className={messageclass}>
      <small className="senderUsername">
        <strong>{sender.username}</strong>
      </small>
      <br></br>
      <p className="message">{message}</p>

      <div className="MessageSendedStatus">
        <small className="text-muted">{date}</small>
        {sender._id === requestUserId &&
          (isReceived ? (
            isRead ? (
              <img src={check2AllBlue} alt="read" title="read" />
            ) : (
              <img src={check2AllRed} alt="received" title="received" />
            )
          ) : (
            <img src={check2AllBlur} alt="sent" title="sent" />
          ))}
      </div>
    </div>
  );
}

export default MessageCard;
