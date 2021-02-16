import React, { Fragment } from 'react'

import './book-list-item.css'

const BookListItem = ({ book }) => {

    const { title, author } = book

    return(
        <Fragment>
            <h1>{title}</h1>
            <h2>{author}</h2>
        </Fragment>
    )
}

export default BookListItem