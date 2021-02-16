import React from 'react'
import { Link } from 'react-router-dom'

import './shop-header.css'

const ShopHeader = ({ numItems, total }) => {
    return(
        <header className="shop-header">
            <Link className="logo text-dark" to="/">ReStore</Link>
            <Link className="shopping-cart" to="/cart">
                <i className="cart-icon fa fa-shopping-cart" />
                {numItems} items (${total})
            </Link>
        </header>
    )
}

export default ShopHeader