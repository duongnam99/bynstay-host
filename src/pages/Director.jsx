import React, {Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const Director = () => {
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            history.push({
                pathname: `/login`,
            })
        }
        history.push({
            pathname: `/home`,
        })

    }, []);

    return (
        <>

        </>
    );
  };
   
export default Director;