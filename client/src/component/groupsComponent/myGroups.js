import { useState, useEffect } from "react";
import api from "../../interceptors/axios";
import GroupsCardList from "../controlers/groupsCardList";

function MyGroups() {
  const [groups, setGroups] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getGroups() {
      const response = await api.get("/home/myGroups");
      try {
        if (response.status === 200) {
          setGroups(response.data);
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getGroups();
  }, []);

  return (
    <>
      <h3>My Groups</h3>
      {message && <p>{message}</p>}
      {groups && <GroupsCardList groups={groups} />}
    </>
  );
}

export default MyGroups;
