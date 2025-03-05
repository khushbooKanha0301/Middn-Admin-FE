import React from 'react'
import { usePagination, DOTS } from "./usePagination";

function Pagination(props) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage =
    paginationRange && paginationRange[paginationRange?.length - 1];
  return (
    <div className="pagination flex flex-wrap items-center justify-between">
      {paginationRange?.length >= 2 && (<ul className="flex flex-wrap">
        <li>
          <button onClick={onPrevious} disabled={currentPage === 1}>PREV</button>
        </li>
        {paginationRange?.map((pageNumber,index) => {
          if (pageNumber === DOTS) {
            return <li key={index}>...</li>;
          }

          return (
            <li
              key={index}
              className={pageNumber === currentPage ? "active" : ""}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li>
          <button onClick={onNext} disabled={currentPage === lastPage}>Next</button>
        </li>
      </ul>)}

      {/* <div className="pages text-[rgba(255,255,255,0.50)] font-bold text-[13px]">
      {currentPage === 1
              ? `${totalCount > 0 ? 1 : 0}`
              : `${(currentPage - 1) * pageSize + 1}`}{" "}
            - {`${Math.min(currentPage * pageSize, totalCount)}`} of{" "}
            {totalCount}
      </div> */}
    </div>
  )
}

export default Pagination