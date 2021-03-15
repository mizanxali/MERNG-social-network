import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function AuthRoute({ component: Component, ...rest }) {

    const context = useContext(AuthContext)

    return (
        <Route {...rest} render={routeProps => context.user ? <Redirect to='/' /> : <Component {...routeProps} />} />
    )
}

export default AuthRoute
