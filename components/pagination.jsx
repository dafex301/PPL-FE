import React from 'react'
// import iodash
import _ from 'lodash';

export default function pagination({ items, pageSize, currentPage, onPageChange }) {

    const pageCount = Math.ceil(items / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);



    return (
        <nav>
            <ul className="flex justify-end pr-3 rounded list-none flex-wrap">
                {
                    pages.map((page) => (
                        <li key={page}>
                            <a style={{ cursor: "pointer" }} onClick={() => onPageChange(page)} className={page === currentPage ? "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blue-500 text-white bg-blue-500" : "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blue-500 bg-white text-blue-500"}>
                                {page}
                            </a>
                        </li>

                    ))
                }
            </ul>
        </nav>

    )
}

