import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BookListItem from '../book-list-item'
import ErrorIndicator from '../error-indicator'
import { withBookstoreService } from '../hoc'
import { booksLoaded, booksRequested, booksError } from '../../actions'
import Spinner from '../spinner'
import compose from '../../utils'
import './book-list.css'

class BookList extends Component {

    componentDidMount(){
        this.props.fetchBooks()
    }

    render(){
        const { books, loading, error } = this.props
        
        if (loading) return <Spinner />
        if (error) return <ErrorIndicator />

        return(
            <ul className="book-list">
                {
                    books.map(book => {
                        return(
                            <li key={book.id}>
                                <BookListItem book={book} />
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

}

const mapStateToProps = ({ books, loading, error }) => {
    return { books, loading, error }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    /**
     * bindActionCreators возвращает точно объект со структурой, описанной ниже
     * Поэтому можно вместо этого громоздкого кода:
     *  return {
            booksLoaded: (newBooks) => {
                dispatch(booksLoaded(newBooks))
            }
        } 
        написать:
     * bindActionCreators({
     *  booksLoaded
     * } - передаем объект с action creators, dispatch)
     */

     /**
      * А можно пойти ещё дальше и написать mapDispatchToProps = { booksLoaded }
      * Т.к. если вместо функции в connect мы передаем объект, то этот объект попадет в качестве аргумента в bindActionCreators
      */


    //Вместо этого:

    // return bindActionCreators({
    //     booksLoaded,
    //     booksRequested,
    //     booksError,
    // }, dispatch)

    //Напишу это:
    const { bookstoreService } = ownProps
    return {
        fetchBooks: () => {    
            dispatch(booksRequested())
            bookstoreService.getBooks()
                .then(data => dispatch(booksLoaded(data)))
                .catch(err => dispatch(booksError(err)) )
        }
    }
}

/**
 * Экспорт, описанный ниже, альтернатива другой записи:
 * export default withBookService()(
 *  connect(mapStateToProps, mapDispatchToProps)(BookList)
 * )
 */

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList)
