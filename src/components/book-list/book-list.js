import React, { Component } from 'react'
import { connect } from 'react-redux'

import BookListItem from '../book-list-item'
import ErrorIndicator from '../error-indicator'
import { withBookstoreService } from '../hoc'
import { fetchBooks, bookAddedToCart } from '../../actions'
import Spinner from '../spinner'
import compose from '../../utils'
import './book-list.css'

const BookList = ({ books, onAddedToCart }) => {
    return(
        <ul className="book-list">
            {
                books.map(book => {
                    return(
                        <li key={book.id}>
                            <BookListItem
                                book={book}
                                onAddedToCart={() => onAddedToCart(book.id)}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
}

class BookListContainer extends Component {

    componentDidMount(){
        this.props.fetchBooks()
    }

    render(){
        const { books, loading, error, onAddedToCart } = this.props
        
        if (loading) return <Spinner />
        if (error) return <ErrorIndicator />
        return <BookList 
                onAddedToCart={onAddedToCart}
                books={books}/>
    }
}

const mapStateToProps = ({ books, loading, error }) => {
    return { books, loading, error }
}

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer)
