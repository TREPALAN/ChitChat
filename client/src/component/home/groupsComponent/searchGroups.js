import { useState } from "react";
import api from "../../../interceptors/axios";
import GroupsCardList from "../../cards/groupsCardList";

function SearchGroups() {
  const [groups, setGroups] = useState([]);
  const [message, setMessage] = useState("Search for groups");
  const [search, setSearch] = useState("");

  async function handleSearchGroups(event) {
    event.preventDefault();
    const response = await api.get("/home/searchGroups", {
      params: { groupName: search },
    });
    try {
      if (response.status === 200) {
        setMessage("");
        setGroups(response.data);
      } else {
        setMessage(response.data.message);
        setGroups([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h3>Search Groups</h3>
      <div className="GroupSearchBar">
        <form
          className="input-group input-group-lg"
          onSubmit={handleSearchGroups}
        >
          <input
            type="text"
            placeholder="Search"
            className="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              setSearch(e.target.value);
              setMessage("");
            }}
          />
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>

        {message && (
          <p>
            {message} <strong>{search}</strong>
          </p>
        )}

        {groups && <GroupsCardList groups={groups} />}
      </div>
    </>
  );
}

export default SearchGroups;
