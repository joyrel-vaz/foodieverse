import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({component: Component, ...rest }) {
    const {currentUser} = useAuth()

    return (
        <Route
            {...rest}
            render = {props =>{
                return currentUser ? 
                <div>
                    {currentUser.emailVerified ? <Component {...props} /> : <Redirect to="/login-error"/>
                    }
                </div>
                :<Redirect to="/login-error"/>
            }}
        >

        </Route>
    )
}
