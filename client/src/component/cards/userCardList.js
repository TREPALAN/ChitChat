import { useEffect, useState } from "react";
import UserCard from "./userCard";
import { getSocket } from "../../socket/socket";
import "../css/userCardList.css";
import paginate from "../../utils/itenPagination";

function UserCardList({ users }) {
  //  Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginatedUsers = paginate(users, itemsPerPage, currentPage);

  const [hasNewMessage, setHasNewMessage] = useState([]);
  useEffect(() => {
    const socket = getSocket();
    socket.on("receivePrivateMessage", (message, username) => {
      // get new messages
      console.log(message.message, username);
      const newMessage = { user: username, message: message };
      setHasNewMessage([...hasNewMessage, newMessage]);
    });
  }, [hasNewMessage]);

  return (
    <>
      {paginatedUsers.map(
        ({
          _id,
          username,
          profilePicture,
          isFriend,
          isRequestSent,
          isRequestReceived,
        }) => (
          <UserCard
            key={_id}
            id={_id}
            username={username}
            profilePicture={profilePicture}
            isFriend={isFriend}
            isRequestSent={isRequestSent}
            isRequestReceived={isRequestReceived}
            hasNewMessage={hasNewMessage.some((m) => m.user === username)}
          />
        )
      )}

      {totalPages > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {currentPage > 1 && (
              <li
                className="page-item"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <p className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </p>
              </li>
            )}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <li
                  key={page}
                  className={`page-item ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  <p className="page-link" onClick={() => setCurrentPage(page)}>
                    {page}
                  </p>
                </li>
              )
            )}

            {currentPage < totalPages && (
              <li className="page-item">
                <p
                  className="page-link"
                  aria-label="Next"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </p>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}

export default UserCardList;
