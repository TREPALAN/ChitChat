import api from "../../../interceptors/axios";
import { useState, useReducer, useRef, useEffect } from "react";
import MembersReducerLogic from "./membersReducerLogic";
import exclamationCircleFillRed from "../../../icons/exclamationCircleFillRed.svg";
import squareFillRed from "../../../icons/squareFillRed.svg";
import "../../css/groupMembers.css";

function changesReducer(members, action) {
  switch (action.type) {
    case "setInitialMembers":
      return [];
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

  useEffect(() => {
    setChanges({ type: "setInitialMembers" });
  }, [members]);

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
    <div className="groupMembersPopUp">
      <p className="closeBtn" onClick={() => setTrigger(false)}>
        X
      </p>

      <div className="groupGeneral">
        {/* Add Member */}
        <h5>Add Member</h5>
        <form onSubmit={searchNewMembers}>
          <input
            type="text"
            value={searchNewMember}
            autoComplete="username"
            className="form-control"
            id="userSearch"
            placeholder="username"
            onChange={(e) => setSearchNewMember(e.target.value)}
          />
          <button type="button" className="btn btn-outline-info">
            Search
          </button>
        </form>

        <br />

        <div className="searchResult">
          {seacrhResult &&
            seacrhResult.map((member) => (
              <div key={member._id} className="result">
                <strong className="username">{member.username}</strong>
                {!members.some((m) => m._id === member._id) && (
                  <MembersReducerLogic
                    changes={changes}
                    setChanges={setChanges}
                    member={member}
                  />
                )}
              </div>
            ))}
        </div>
        <div>
          {/* Request */}
          <h5>Requestes</h5>
          {group.requests.map((request) => (
            <div key={request._id} id={`request${request._id}`}>
              <strong className="username">{request.username}</strong>

              <>
                <img
                  src={squareFillRed}
                  alt="decline"
                  onClick={() => deleteRequest(request._id)}
                />
                Decline
              </>

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
              <strong className="username">{member.username}</strong>
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
                    <>
                      <img
                        src={squareFillRed}
                        alt="remove"
                        onClick={() =>
                          setChanges({ type: "removeMember", menber: member })
                        }
                      />
                      Remove
                    </>
                  ))}
              <br />
            </div>
          ))}
        </div>
      </div>

      <div className="changes">
        {changes.map((change) => (
          <div key={change.member._id}>
            {change.action === "add" ? (
              <>
                <img src={exclamationCircleFillRed} alt="add" />
                <strong className="username">{change.member.username}</strong>
                <span style={{ color: "green" }}>Will be added</span>
                <MembersReducerLogic
                  member={change.member}
                  changes={changes}
                  setChanges={setChanges}
                />
              </>
            ) : (
              <>
                <img src={exclamationCircleFillRed} alt="remove" />
                <strong className="username">{change.member.username}</strong>
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
      </div>

      {isAdmin && changes.length > 0 && (
        <div className="saveBtn">
          <strong style={{ color: "red", marginRight: "0.5rem" }}>
            On Hit save all changes will be saved
          </strong>
          <button onClick={handleSubmit} className="btn btn-primary">
            Save
          </button>
        </div>
      )}
    </div>
  ) : null;
}

export default GroupMembers;
