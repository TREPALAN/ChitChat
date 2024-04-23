import "../../css/editGroup.css";
import { useState, useEffect, useRef } from "react";
import api from "../../../interceptors/axios";

function EditGroup(props) {
  const setTrigger = props.setTrigger;
  const setChangedGroup = props.setGroup;

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
        setTrigger(false);
        setChangedGroup(group);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return props.trigger ? (
    <div className="editGroupPopUp">
      <form onSubmit={handleSubmit} className="form-group">
        <p className="closeBtn" onClick={() => setTrigger(false)}>
          X
        </p>
        <h3>Edit Group</h3>
        <label htmlFor="groupNameInput">Name</label>
        <input
          type="text"
          id="groupNameInput"
          className="form-control"
          placeholder="Group Name"
          value={group.name}
          onChange={(e) => setGroup({ ...group, name: e.target.value })}
        />
        <div className="form-text">Be creative</div>
        <label htmlFor="groupDescriptionInput">Description</label>
        <textarea
          className="form-control"
          id="groupDescriptionInput"
          rows="3"
          value={group.description}
          onChange={(e) => setGroup({ ...group, description: e.target.value })}
        />
        <h6>Members</h6>
        <div>
          {group.members.map((member) => (
            <div key={member._id}>
              {member.username}
              {member._id === requestUserId.current ? " (You)" : ""}
              <br />
              {group.admin.includes(member._id) ? (
                <button
                  type="button"
                  className="btn btn-danger"
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
                  className="btn btn-primary"
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
        <div className="AdminList">
          <h6>Admins</h6>
          {admins.map((admin) => (
            <div key={admin.id}>
              {admin.username}
              <br />
            </div>
          ))}
          <small>
            <strong className="error">
              You must click save in order to save the changes
            </strong>
          </small>
        </div>

        <div className="SubmitBtnsGroupEdit">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setTrigger(false)}
          >
            Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  ) : null;
}

function getAdmins(group) {
  // Get admins usernames
  const menbers = group.members.map((member) => {
    return { id: member._id, username: member.username };
  });
  const admins = menbers.filter((member) => group.admin.includes(member.id));
  return admins;
}

export default EditGroup;
