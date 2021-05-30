
import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { history } from './helpers/history';
import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './components/PrivateRoute';

import LoginPage from './pages/Login';
import RegistrationPage from './pages/Registration';
import HomePage from './pages/Home';
import EditInfo from './components/main/host/EditInfo'

import 'react-toastify/dist/ReactToastify.css';
import Director from './pages/Director';

export default function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        toast.configure()

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
                    <PrivateRoute path="/home" component={HomePage} />
                    <Route exact path="/" component={Director} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/registration" component={RegistrationPage} />
                    {/* <Redirect from="*" to="/" /> */}
                </Switch>
            </Router>

        </>
    );
}
