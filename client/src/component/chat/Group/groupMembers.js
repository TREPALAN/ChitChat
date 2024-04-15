import "../../css/groupChat.css";
import api from "../../../interceptors/axios";
import { useState, useReducer, useRef } from "react";
import MembersReducerLogic from "./membersReducerLogic";

function changesReducer(members, action) {
  switch (action.type) {
    case "addMember":
      return [...members, { member: action.menber, action: "add" }];

    case "cancelAddMember":
      return members.filter((member) => member.member !== action.menber);

    case "removeMember":
      return [...members, { member: action.menber, action: "remove" }];

    case "cancelRemoveMember":
      return members.filter((member) => member.member !== action.menber);

    default:
      return members;
  }
}

function GroupMembers(props) {
  const group = props.group;
  const groupId = props.groupId;
  const trigger = props.trigger;
  const members = props.group.members;
  const setTrigger = props.setTrigger;
  const setGroup = props.setGroup;

  const requestUserId = useRef(localStorage.getItem("id"));
  const [changes, setChanges] = useReducer(changesReducer, []);
  const [searchNewMember, setSearchNewMember] = useState("");
  const [seacrhResult, setSearchResult] = useState([]);
  const isAdmin = useState(props.isAdmin);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.put("/chat/updateMembers", {
      groupId,
      changes,
    });

    if (response.status === 200) {
      setTrigger(false);
      setGroup(response.data.updatedGroup);
    } else {
      console.log(response.data.message);
    }
  }

  async function deleteRequest(memberId) {
    const response = await api.put("/chat/deleteGroupRequest", {
      userId: memberId,
      groupId,
    });
    if (response.status === 200) {
      document.querySelector(`#request${memberId}`).remove();
    }
  }

  async function searchNewMembers(e) {
    e.preventDefault();
    if (searchNewMember) {
      const response = await api.get("/home/searchUser", {
        params: { username: searchNewMember },
      });

      if (response.status === 200) {
        if (response.data.code === 400) {
          // If user is not in this group
          console.log(response.data.message);
          return;
        }
        setSearchResult(response.data);
      }
    }
  }

  return trigger ? (
    <div className="editGroupPopUp">
      <div className="editGroupPopUp-inner">
        <p className="closeBtn" onClick={() => setTrigger(false)}>
          X
        </p>

        {/* Add Member */}
        <h5>Add Member</h5>
        <form onSubmit={searchNewMembers}>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setSearchNewMember(e.target.value)}
          />
          <button type="button">Search</button>
        </form>
        {seacrhResult &&
          seacrhResult.map((member) => (
            <div key={member._id}>
              {member.username}
              {!members.some((m) => m._id === member._id) && (
                <MembersReducerLogic
                  changes={changes}
                  setChanges={setChanges}
                  member={member}
                />
              )}
            </div>
          ))}
        <div>
          {/* Request */}
          <h5>Requestes</h5>
          {group.requests.map((request) => (
            <div key={request._id} id={`request${request._id}`}>
              {request.username}

              <button type="button" onClick={() => deleteRequest(request._id)}>
                Decline
              </button>

              <MembersReducerLogic
                changes={changes}
                setChanges={setChanges}
                member={request}
              />
            </div>
          ))}

          <h5>Members</h5>
          {members.map((member) => (
            <div key={member._id}>
              {member.username}
              {member._id === requestUserId.current
                ? " (You)"
                : isAdmin &&
                  (changes.some(
                    (change) => change.member._id === member._id
                  ) ? (
                    <MembersReducerLogic
                      changes={changes}
                      setChanges={setChanges}
                      member={member}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setChanges({ type: "removeMember", menber: member })
                      }
                    >
                      Remove
                    </button>
                  ))}
              <br />
            </div>
          ))}
        </div>

        {changes.map((change) => (
          <div key={change.member._id}>
            {change.action === "add" ? (
              <>
                {change.member.username}{" "}
                <span style={{ color: "green" }}>Will be added</span>
                <MembersReducerLogic
                  member={change.member}
                  changes={changes}
                  setChanges={setChanges}
                />
              </>
            ) : (
              <>
                {change.member.username}{" "}
                <span style={{ color: "red" }}>Will be removed</span>
                <MembersReducerLogic
                  member={change.member}
                  changes={changes}
                  setChanges={setChanges}
                />
              </>
            )}
          </div>
        ))}
        {isAdmin && changes.length > 0 && (
          <>
            <button onClick={handleSubmit}>Save</button>
            <strong style={{ color: "red" }}>
              On Hit save all changes will be saved
            </strong>
          </>
        )}
      </div>
    </div>
  ) : null;
}

export default GroupMembers;
