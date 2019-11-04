import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withContext } from '../app/AppContext';

function ProtectedRoute(props) {
    const { component: Component, ...rest} = props;
    return (
        props.token ?
            <Route {...rest} component={Component} /> :
            <Redirect to="/signin" />
    )
}

export default withContext(ProtectedRoute);