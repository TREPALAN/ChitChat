import "../../css/groupChat.css";
import api from "../../../interceptors/axios";
import { useState, useEffect, useRef } from "react";

function GroupMenbers(props) {
  const requestUserId = useRef(localStorage.getItem("id"));
  const [members, setMembers] = useState(props.group.members);
  const [searchNewMember, setSearchNewMember] = useState("");
  const [seacrhResult, setSearchResult] = useState([]);
  const [isAdmin, setIsAdmin] = useState(props.isAdmin);
  function removeMember(member) {
    if (!member.isRemoved) {
      member.isRemoved = true;
    } else {
      member.isRemoved = false;
    }
    setMembers([...members]);
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

  return props.trigger ? (
    <div className="editGroupPopUp">
      <div className="editGroupPopUp-inner">
        <p className="closeBtn" onClick={() => props.setTrigger(false)}>
          X
        </p>
        <h5>Add Member</h5>
        <form onSubmit={searchNewMembers}>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setSearchNewMember(e.target.value)}
          />
          <button type="button">Add</button>
        </form>
        {seacrhResult &&
          seacrhResult.map((member) => (
            <div key={member._id}>
              {member.username}
              {!members.some((m) => m._id === member._id) && (
                <button
                  type="button"
                  onClick={() => setMembers([...members, member])}
                >
                  Add
                </button>
              )}
            </div>
          ))}
        <div>
          <h5>Members</h5>
          {members.map((member) => (
            <div key={member._id}>
              {member.username}
              {member._id === requestUserId.current ? (
                " (You)"
              ) : isAdmin ? (
                member.isRemoved ? (
                  <>
                    <button type="button" onClick={() => removeMember(member)}>
                      Add
                    </button>

                    <span style={{ marginLeft: "10px", color: "red" }}>
                      menber will be removed when you hit the save button
                    </span>
                  </>
                ) : (
                  <button type="button" onClick={() => removeMember(member)}>
                    Remove
                  </button>
                )
              ) : null}
              <br />
            </div>
          ))}
        </div>
        {isAdmin && (
          <button onClick={() => props.setTrigger(false)}>Save</button>
        )}
      </div>
    </div>
  ) : null;
}

export default GroupMenbers;
