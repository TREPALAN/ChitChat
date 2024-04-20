import { useRef, useState } from "react";
import api from "../../interceptors/axios";
import personAdd from "../../icons/personAdd.svg";
import peopleFillRed from "../../icons/peopleFillRed.svg";
import peopleFillBlue from "../../icons/peopleFillBlue.svg";
import personFillGearBlue from "../../icons/personFillGearBlue.svg";
import personFillGearRed from "../../icons/personFillGearRed.svg";
import sendPlus from "../../icons/sendPlus.svg";
import "../css/groupCard.css";

function GroupCard({ id, name, description, members, admin, requested }) {
  const requetUserId = useRef(null);
  const isAdmin = useRef(null);

  if (isAdmin.current === null) {
    const admins = admin.map((admin) => admin._id);
    isAdmin.current = admins.includes(localStorage.getItem("id"));
  }

  if (requetUserId.current === null) {
    requetUserId.current = localStorage.getItem("id");
  }

  const [isRequestedToJoin, setIsRequestedToJoin] = useState(requested);
  async function RequestToJoin() {
    try {
      const result = await api.put("/chat/requestToJoin", { groupId: id });
      if (result.status === 200) {
        setIsRequestedToJoin(!isRequestedToJoin);
      } else {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <h5>{name}</h5>
          {members.includes(requetUserId.current) ? (
            <>
              <img
                src={peopleFillBlue}
                alt="member"
                title="You are a member of this group"
              />{" "}
              {isAdmin.current ? (
                <img
                  src={personFillGearBlue}
                  alt="admin"
                  title="You are a Admin"
                />
              ) : (
                <img
                  src={personFillGearRed}
                  alt="not admin"
                  title="You are not a Admin"
                />
              )}{" "}
              <a href={`/groupChat/${id}`}>
                <img src={sendPlus} alt="chat" title="Enter Group" />
              </a>
            </>
          ) : (
            <>
              <img
                src={peopleFillRed}
                alt="not a member"
                title="You are not a member of this group"
              />{" "}
              {isRequestedToJoin ? (
                <small style={{ color: "green" }}>Requested to Join</small>
              ) : (
                <img
                  src={personAdd}
                  alt="add"
                  title="Request to Join"
                  onClick={RequestToJoin}
                />
              )}
            </>
          )}
        </div>

        <p className="card-text groupDescription">{description}</p>
        <p className="card-text">
          Admin:{" "}
          <strong>
            {admin.map((a, index) => {
              return index === 0 ? a.username : ", " + a.username;
            })}
          </strong>
        </p>
        <p className="card-text">
          Members: <strong>{members.length}</strong>
        </p>
      </div>
    </div>
  );
}

export default GroupCard;
