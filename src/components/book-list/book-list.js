import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BookListItem from '../book-list-item'
import { withBookstoreService } from '../hoc'
import { booksLoaded, booksRequested } from '../../actions'
import Spinner from '../spinner'
import compose from '../../utils'
import './book-list.css'

class BookList extends Component {

    getData = async (service, func) => {
        const res = await service.getBooks()
        func(res)
    }

    componentDidMount(){
        const { bookstoreService, booksLoaded, booksRequested } = this.props
        booksRequested()
        this.getData(bookstoreService, booksLoaded)
    }

    render(){
        const { books, loading } = this.props

        if (loading) return <Spinner />

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

const mapStateToProps = ({ books, loading }) => {
    return { books, loading }
}

const mapDispatchToProps = (dispatch) => {
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



    return bindActionCreators({
        booksLoaded,
        booksRequested
    }, dispatch)
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
