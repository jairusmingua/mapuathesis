import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {util} from '../utils/util';
const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={() => (
            (util.isLogin()==false && restricted) ?
                <Redirect to="/" />
            : <Component {...rest} />
        )} />
    );
};

export default PublicRoute;