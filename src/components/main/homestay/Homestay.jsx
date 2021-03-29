import React, {Component, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect, useRouteMatch, NavLink } from 'react-router-dom';
import Axios from "axios";
import { stringify } from "querystring";

import Create from './Create'
import ListHomestay from './ListHomestay'
import EditHomestay from './EditHomestay'


const Homestay = () => {
    let { path, url } = useRouteMatch();

    return (
        <div className="homestay_main">
            <button className="addHomestay"><NavLink to={`${url}/create`}>Tạo địa điểm</NavLink></button>
            
            <div className="create_scr">
            <Switch>
                <Route exact path={path} component={ListHomestay} />
                <Route path={`${path}/create`} component={Create} />
                <Route path={`${path}/edit/:id`} component={EditHomestay} />
            </Switch>
            </div>
      
        </div>
    );
};

export default Homestay;