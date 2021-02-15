import React from 'react'

const Counter = ({ counter, inc, dec, rnd }) => {

    return(
        <div className="jumbotron">
            <h2 id="counter">{counter}</h2>
            <button
                id="inc"
                className="btn btn-primary btn-lg"
                onClick={inc}>INC</button>
            <button
                id="dec"
                className="btn btn-primary btn-lg"
                onClick={dec}>DEC</button>
            <button
                id="rnd"
                className="btn btn-primary btn-lg"
                onClick={rnd}>RND</button>
        </div>
    )
}

export default Counter