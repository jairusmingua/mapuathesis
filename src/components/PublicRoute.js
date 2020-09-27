import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {util} from '../utils/util';
const PublicRoute = ({component: Component, restricted, ...rest}) => {
    console.log(rest);
    return (
        <Route {...rest} render={(props) => (
            (util.isLogin()==false && restricted) ?
                <Redirect to="/" />
            : <Component {...props} {...rest} />
        )} />
    );
};

export default PublicRoute;