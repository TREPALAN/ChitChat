import "../css/groupChat.css";
import { useState, useEffect, useRef } from "react";
import api from "../../interceptors/axios";

function getAdmins(group) {
  // Get admins usernames
  const menbers = group.members.map((member) => {
    return { id: member._id, username: member.username };
  });
  const admins = menbers.filter((member) => group.admin.includes(member.id));
  return admins;
}

function EditGroup(props) {
  const requestUserId = useRef(localStorage.getItem("id"));
  const [group, setGroup] = useState(props.group);
  const [admins, setAdmins] = useState(getAdmins(props.group));

  useEffect(() => {
    // Get admins usernames when group changes
    setAdmins(getAdmins(group));
  }, [group]);

  async function handleSubmit(e) {
    e.preventDefault();
    group.admin = admins.map((admin) => admin.id);

    const response = await api.put(`/chat/editGroup`, { group });

    try {
      if (response.status === 200) {
        props.setTrigger(false);
        props.setGroup(group);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return props.trigger ? (
    <div className="editGroupPopUp">
      <div className="editGroupPopUp-inner">
        <p className="closeBtn" onClick={() => props.setTrigger(false)}>
          X
        </p>
        <p>Edit Group</p>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Group Name</p>
            <input
              type="text"
              value={group.name}
              onChange={(e) => setGroup({ ...group, name: e.target.value })}
            />
          </label>
          <br />
          <label>
            <p>Description</p>
            <textarea
              type="text"
              value={group.description}
              onChange={(e) =>
                setGroup({ ...group, description: e.target.value })
              }
            />
          </label>
          <h6 style={{ marginTop: "10px" }}>Members</h6>
          <div style={{ backgroundColor: "lightgrey" }}>
            {group.members.map((member) => (
              <div key={member._id}>
                {member.username}
                {member._id === requestUserId.current ? " (You)" : ""}
                <br />
                {group.admin.includes(member._id) ? (
                  <button
                    type="button"
                    onClick={() =>
                      setGroup({
                        ...group,
                        admin: group.admin.filter(
                          (admin) => admin !== member._id
                        ),
                      })
                    }
                  >
                    Remove As Admin
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setGroup({
                        ...group,
                        admin: [...group.admin, member._id],
                      })
                    }
                  >
                    Add As Admin
                  </button>
                )}
                <br />
              </div>
            ))}
          </div>

          <h6 style={{ marginTop: "10px" }}>Admins</h6>
          <div style={{ backgroundColor: "grey" }}>
            {admins.map((admin) => (
              <div key={admin.id}>
                {admin.username}
                <br />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-end">
            <button type="button" onClick={() => props.setTrigger(false)}>
              Cancel
            </button>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default EditGroup;
