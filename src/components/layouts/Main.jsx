import React, {Component, useState, useEffect } from 'react';
import { Router, Route, Switch, useRouteMatch, Redirect, NavLink, Link, HashRouter } from 'react-router-dom';
import Axios from "axios";
import { stringify } from "querystring";

import CreateHsCommonInfo from '../main/homestay/CreateHsCommonInfo'
import CreateHsUtility from '../main/homestay/CreateHsUtility'
import Homestay from '../main/homestay/Homestay'


const Main = ({ }) => {
    let { path, url } = useRouteMatch();

    return (
        <>        
        <div className="col-3">
            <div className="sidebar">
                <ul className="">
                    <li>
                        <NavLink to={`${url}homestay`}>Homestay</NavLink>
                    </li>
                    <li>
                        <NavLink to={`${url}client`}>Khách hàng</NavLink>
                    </li>
                    <li>
                        <NavLink to={`${url}revenue`}>Doanh thu</NavLink>
                    </li>
                </ul>
            </div>
        </div>

        <div className="col-9">
            <Switch>
                <Route path={`${path}homestay`} component={Homestay} />
                <Route path={`${path}revenue`} component={CreateHsUtility} />
            </Switch>
        </div>

        </>

    );
  };
   
export default Main;