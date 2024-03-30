import { useState, useEffect } from "react";
import api from "../interceptors/axios";
import GroupsCardList from "./groupsCardList";

function MyGroups() {
  const [groups, setGroups] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getGroups() {
      const response = await api.get("/home/groups");
      try {
        if (response.status === 200) {
          setGroups(response.data.groups);
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getGroups();
  }, [groups]);

  return (
    <>
      <h1>My Groups</h1>
      {message && <p>{message}</p>}
      {groups && <GroupsCardList groups={groups} />}
    </>
  );
}

export default MyGroups;
