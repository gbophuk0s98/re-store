import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, bindActionCreators } from 'redux'
import reducer from './reducer'
import * as actions from './actions'

import Counter from './counter'

const store = createStore(reducer)
const { dispatch, getState } = store

const { inc, dec, rnd } = bindActionCreators(actions, dispatch)

// document.getElementById('inc').addEventListener('click', inc)

// document.getElementById('dec').addEventListener('click', dec)

// document.getElementById('rnd').addEventListener('click', () => {
//     const payload = Math.floor(Math.random() * 10)
//     rnd(payload)
// })

const update = () => {  
    ReactDOM.render(
        <Counter 
            counter={getState()}
            inc={inc}
            dec={dec}
            rnd={() => {
                const payload = Math.floor(Math.random() * 10)
                rnd(payload)
            }}
        />,
         document.getElementById('root'))
}

update()
store.subscribe(update)