import React from 'react'
import { withBookstoreService } from '../hoc'
import { Route, Switch } from 'react-router-dom'
import { HomePage, CartPage } from '../pages'

import './app.css'

const App = ({ bookstoreService }) => {
    return(
        <div className="container">
            <Switch>
                <Route path="/" component={HomePage} exact/>
                <Route path="/cart" component={CartPage}/>
            </Switch>
        </div>
        )
}

export default App