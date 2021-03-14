

// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Switch, Route } from "react-router-dom";

// import LoginPage from './pages/Login'

// export default function App() {


//   return (
//     <>
//       <BrowserRouter>
//           <Switch>
//             <Route name="login_page" exact path="/login" component={LoginPage} />
//           </Switch>
//       </BrowserRouter>
//     </>
//   );
// }

import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from './helpers/history';
import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './components/PrivateRoute';

import LoginPage from './pages/Login';
import RegistrationPage from './pages/Registration';
import HomePage from './pages/Home';

export default function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <>
            {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/registration" component={RegistrationPage} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>

        </>
    );
}
