import logout from "../../utils/logoutFunction";
import "../css/navigationBar.css";

const username = localStorage.getItem("username");

function NavigationBar() {
  return (
    <div className="navigationBar">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            ChitChat
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/friendRequests">
                  Friend Requests
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/allFriends">
                  Friends
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/groups">
                  Groups
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/addFriend">
                  Add Friend
                </a>
              </li>
              <li className="nav-item">
                <span className="nav-link disabled" aria-disabled="true">
                  Loged as {username}
                </span>
              </li>
            </ul>
          </div>
          <span className="d-flex logoutButton" onClick={logout}>
            Logout
          </span>
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;
