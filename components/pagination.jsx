import React from "react";
// import iodash
import _ from "lodash";

export default function pagination({
  items,
  pageSize,
  currentPage,
  onPageChange,
}) {
  const pageCount = Math.ceil(items / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const handleBack = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage === pageCount) return;
    onPageChange(currentPage + 1);
  };

  return (
    <>
      {pageCount != 0 && (
        <nav>
          <ul className="flex justify-evenly pr-3 rounded items-center list-none flex-wrap">
            <a
              onClick={handleBack}
              className={
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed rounded-full w-8 h-8 flex items-center justify-center"
                  : "border-solid border-violet-500 text-white bg-violet-500 rounded-full w-8 h-8 hover:bg-violet-700 items-center flex justify-center cursor-pointer"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </a>
            <div className="flex">
              {pages.map((page) => (
                <li key={page}>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => onPageChange(page)}
                    className={
                      page === currentPage
                        ? "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-violet-500 text-white bg-violet-500 hover:bg-violet-700"
                        : "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-violet-500 bg-white text-violet-500 hover:bg-gray-100"
                    }
                  >
                    {page}
                  </a>
                </li>
              ))}
            </div>

            <a
              onClick={handleNext}
              className={
                currentPage === pageCount
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed rounded-full w-8 h-8 flex items-center justify-center"
                  : "border-solid border-violet-500 text-white bg-violet-500 rounded-full w-8 h-8 hover:bg-violet-700 items-center flex justify-center cursor-pointer"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>
          </ul>
        </nav>
      )}
    </>
  );
}
