import React from 'react'

export const Pagination = ({postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="Pagination">
            {pageNumbers.map(number => (
                <li key={number} className="page-item">
                    <a onClick={() => paginate(number)} href="!#" className="page-link">
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default Pagination;