import GroupCard from "./groupCard";
import itenPagination from "../../utils/itenPagination";
import { useState } from "react";

function GroupsCardList({ groups }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const totalPages = Math.ceil(groups.length / itemsPerPage);

  const paginatedGroups = itenPagination(groups, itemsPerPage, currentPage);

  return (
    <>
      <div>
        {paginatedGroups.map(
          ({ _id, name, description, members, admin, requests }) => (
            <GroupCard
              key={_id}
              id={_id}
              name={name}
              description={description}
              members={members}
              admin={admin}
              requested={requests.includes(localStorage.getItem("id"))}
            />
          )
        )}
      </div>

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

export default GroupsCardList;
