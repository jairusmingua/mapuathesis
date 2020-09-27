import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {util} from '../utils/util.js';
const PrivateRoute = ({component: Component, ...rest}) => {
    console.log(util.isDone());
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            util.isDone()==true ?
                <Component {...rest} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;