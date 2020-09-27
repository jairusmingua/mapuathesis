import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {util} from '../utils/util.js';
const PrivateRoute = ({component: Component, ...rest}) => {
    console.log(util.isDone());
    return (
        <Route {...rest} render={props => (
            util.isDone()==true ?
                <Component {...props} {...rest}/>
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;