import SearchGroups from "./searchGroups";
import CreateGroup from "./createGroup";
import MyGroups from "./myGroups";
import "../css/GroupsNavigation.css";

// Order is Groups > Goups Navigation > (My Groups, Search Groups, Create Group) > GroupCardList > GroupCard
function GroupsNavigation() {
  function handleDivDisplay(e) {
    e.preventDefault();
    const MyGroups = document.getElementById("myGroups");
    const SearchGroup = document.getElementById("searchGroup");
    const CreateGroup = document.getElementById("createGroup");

    const page = e.target.getAttribute("data-page");

    switch (page) {
      case "MyGroups":
        MyGroups.style.display = "block";
        SearchGroup.style.display = "none";
        CreateGroup.style.display = "none";
        break;
      case "SearchGroup":
        MyGroups.style.display = "none";
        SearchGroup.style.display = "block";
        CreateGroup.style.display = "none";
        break;
      case "CreateGroup":
        MyGroups.style.display = "none";
        SearchGroup.style.display = "none";
        CreateGroup.style.display = "block";
        break;

      default:
        MyGroups.style.display = "block";
        SearchGroup.style.display = "none";
        CreateGroup.style.display = "none";
        break;
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <p
            className="navbar-brand"
            data-page="MyGroups"
            onClick={handleDivDisplay}
            style={{ cursor: "pointer" }}
          >
            My Groups
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <p className="navbar-toggler-icon"></p>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <p
                  className="nav-link active"
                  aria-current="page"
                  data-page="CreateGroup"
                  style={{ cursor: "pointer" }}
                  onClick={handleDivDisplay}
                >
                  Create Group
                </p>
              </li>
              <li className="nav-item">
                <p
                  className="nav-link"
                  data-page="SearchGroup"
                  onClick={handleDivDisplay}
                  style={{ cursor: "pointer" }}
                >
                  Search Group
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="myGroups">
        <MyGroups />
      </div>

      <div id="createGroup">
        <CreateGroup />
      </div>

      <div id="searchGroup">
        <SearchGroups />
      </div>
    </>
  );
}

export default GroupsNavigation;
