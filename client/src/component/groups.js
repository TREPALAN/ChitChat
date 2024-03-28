import { useEffect, useState } from "react";
import api from "../interceptors/axios";

function Groups() {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    async function getGroups() {
      const response = await api.get("/home/groups");
      try {
        setGroups(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getGroups();
  });
  return (
    <>
      <h1>Groups</h1>
    </>
  );
}

export default Groups;
