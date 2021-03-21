import React, {Component, useState, useEffect } from 'react';
import Axios from "axios";
import { stringify } from "querystring";

const Header = () => {

    return (
        <header>
        <div class="container header-top">
            <div class="d-flex align-items-center">
                <div class="menu_mobile d-block d-md-none">

                </div>
                <div class="logo">
                    <a href="/">
                        <img src={'/assets/images/logo-byn.png'} alt="" />
                    </a>
                </div>
                <div class="menu_top">
                    <ul class="main-menu">
                        <li class="menu-item">
                            <a href="">
                                <i class="material-icons">email</i>
                                Tin nhắn
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="">
                                <i class="material-icons">chrome_reader_mode</i>
                                Lịch đặt của tôi 
                            </a>
                        </li>
                    </ul>
                    <div class="select-currency">
                        <span class="currency-show ic_vnd">VND</span>
                        <ul>
                            <li>
                                <a href="javascript:;" class="currency-item ic_vnd">
                                    VND
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;" class="currency-item ic_dola">
                                    USD
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="user_head">
                    <div class="d-block d-md-none">
                        <a href="javascript:;">

                        </a>
                    </div>
                    <ul class="link_user">
                        <li class="login">
                            <a href="#">
                                Đăng nhập
                            </a>
                        </li>
                        <li class="regiter">
                            <a href="#">
                                Đăng ký
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="primery-menu">
            <div class="container">
                <ul class="main-menu">
                    <li class="menu-item">
                        <a href="#">
                            <i class="material-icons location_city">location_city</i>
                            Homestay
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#">
                            <span class="dub-ic">
                                <i class="material-icons hotel">hotel</i>
                                <i class="material-icons flight">flight</i>
                            </span>
                            Khách hàng
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#">
                            <i class="material-icons local_activity">local_activity</i>
                            Thống kê
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    );
  };
   
export default Header;