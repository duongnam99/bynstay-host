import React, {Component, useState, useEffect } from 'react';
import { Router, Route, Switch, useRouteMatch, Redirect, NavLink, Link, HashRouter } from 'react-router-dom';

import Homestay from '../main/homestay/Homestay'
import EditInfo from '../main/host/EditInfo'
import { useHistory } from 'react-router-dom';
import Customer from '../main/customer/Customer';
import Order from '../main/order/Order';

const Main = ({ }) => {
    let { path, url } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        history.push({
            pathname: `/home/homestay`,
        })

    }, []);

    return (
        <>    
        <div className="col-3">
            <div className="sidebar">
                <ul className="navigation_home">
                    <li>
                        <NavLink to={`${url}/homestay`}><i class="material-icons location_city">location_city</i> Homestay</NavLink>
                    </li>
                    <li>
                        <NavLink to={`${url}/customer`}><i class="material-icons hotel">hotel</i> Khách hàng</NavLink>
                    </li>
                    <li>
                        <NavLink to={`${url}/order`}><i class="material-icons attach_money">attach_money</i> Đặt chỗ</NavLink>
                    </li>
                    <li>
                        <NavLink to={`${url}/host`}><i class="material-icons info_outline">info_outline</i> Cá nhân</NavLink>
                    </li>
                </ul>
            </div>
        </div>

        <div className="col-9">
            <Switch>
                <Route path={`${path}/homestay`} component={Homestay} />
                <Route path={`${path}/order`} component={Order} />
                <Route path={`${path}/host`} component={EditInfo} />
                <Route path={`${path}/customer`} component={Customer} />
            </Switch>
        </div>

        </>

    );
  };
   
export default Main;