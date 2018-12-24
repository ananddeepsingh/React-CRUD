import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
var token = localStorage.getItem("email");

    return (
        <Route
            {...rest}
            render={props =>
                token == null 
                ? (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
                : (<Component {...props} />)
            }
        />
    )
}

export default PrivateRoute