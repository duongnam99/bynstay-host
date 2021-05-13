import React, {Component, useState, useEffect } from 'react';

import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import Main from '../components/layouts/Main'

const HomePage = () => {
    return (
        <>
             <Header />
             <div className="container mt-5">
               <div className="row">
                  <Main></Main>
               </div>
             </div>
             <Footer />
        </>
    );
  };
   
export default HomePage;