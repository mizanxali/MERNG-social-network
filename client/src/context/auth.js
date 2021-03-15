import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

if(localStorage.getItem('user')) {
    const token = JSON.parse(localStorage.getItem('user')).token
    const decodedToken = jwtDecode(token)

    if(decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('user')
    } else {
        initialState.user = JSON.parse(localStorage.getItem('user'))
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

function authReducer(state, action) {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)
    
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData))
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                login: login,
                logout: logout
            }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }