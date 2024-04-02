// Must be called with items, itemsPerPage, currentPage
function paginate(items, itemsPerPage, currentPage) {
  // handle pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
}

export default paginate;
