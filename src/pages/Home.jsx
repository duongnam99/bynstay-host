import React, {Component, useState, useEffect } from 'react';
import Axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userActions } from '../actions/user.actions';

import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'

const HomePage = () => {
    return (
        <>
             <Header />
             <Footer />
        </>
    );
  };
   
export default HomePage;