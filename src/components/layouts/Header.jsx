import React, {Component, useState, useEffect } from 'react';
import Axios from "axios";
import { stringify } from "querystring";
import { Router, Route, Switch, useRouteMatch, Redirect, NavLink, Link, HashRouter } from 'react-router-dom';
import EditInfo from '../main/host/EditInfo'


const Header = () => {
    let { path, url } = useRouteMatch();
    let [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        console.log(url)
    }, [])
    return (
        <header>
        <div class="container header-top">
            <div class="d-flex align-items-center">
                <div class="menu_mobile d-block d-md-none">

                </div>
                <div class="logo">
                    <NavLink to={`${url}/host/info`}>  
                        <img src={'/assets/images/logo-byn.png'} alt="" />
                    </NavLink>
                </div>
                <div class="menu_top">
                    <ul class="main-menu">
                        <li class="menu-item">
                            {/* <NavLink to={`${url}/host`}>
                                <i class="material-icons">chrome_reader_mode</i>
                                Thông tin cá nhân
                            </NavLink> */}
                      
                        </li>
                    </ul>
                 
                </div>
                <div class="user_head">
                    <NavLink className="wrap_uh " to={`${url}/host`}>
                        <span>{user.name}</span>

                        <div className="wrap-img">
                        <img src={ user.avatar != null ? process.env.REACT_APP_BASE_API_URL + 'uploads/' + user.avatar : '/assets/images/avatar_def.png'} alt=""/>
                        </div>

                    </NavLink>
                </div>
            </div>
        </div>

        <div class="primery-menu">
            <div class="container">
                <ul class="main-menu">
                    <li class="menu-item">
                        <NavLink to={`${url}/homestay`}>  
                            <i class="material-icons location_city">location_city</i>
                            Homestay
                        </NavLink>
                    </li>
                    <li class="menu-item">
                        <NavLink to={`${url}/client`}>  
                            <span class="dub-ic">
                                <i class="material-icons hotel">hotel</i>
                                <i class="material-icons flight">flight</i>
                            </span>
                            Khách hàng
                        </NavLink>
                    </li>
                    <li class="menu-item">
                        <NavLink to={`${url}/revenue`}>  
                            <i class="material-icons local_activity">local_activity</i>
                            Thống kê
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    );
  };
   
export default Header;