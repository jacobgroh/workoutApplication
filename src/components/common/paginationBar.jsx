import React from "react";

const PaginationBar = ({
  count,
  onClick,
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage
}) => {
  let pages = [];
  for (let i = 1; i <= count; i++) {
    if (i == currentPage)
      pages.push(<span className="page page--active">{i}</span>);
    else pages.push(<span className="page">{i}</span>);
  }

  let lowerBound = itemsPerPage * (currentPage - 1) + 1;
  let upperBound = itemsPerPage * currentPage;
  if (upperBound > totalItems) upperBound = totalItems;

  const description = (
    <span>
      Showing {lowerBound}-{upperBound} of {totalItems}
    </span>
  );
  return (
    <div className="paginationBar">
      <div onClick={e => onPageChange(e)}>{pages}</div>
      <div className="paginationBar__meta">{description}</div>
    </div>
  );
};

export default PaginationBar;
