import React, {Component, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect, NavLink, useRouteMatch } from 'react-router-dom';
import {homestayService} from '../../../services/homestay.service'

import EditHomestay from './EditHomestay'

const ListHomestay = () => {
    let { path, url } = useRouteMatch();
    const [homestay, setHomestay] = useState([])
    useEffect(() => {
        homestayService.getHomestay().then((response) => {
            setHomestay(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    return (
        <div className="ListHomestay">
            {homestay.map((item,i) => 
                <div class="card mt-3" key={i}>
                    <div class="card-body">
                    <NavLink to={`${url}/edit/${item.id}`}><h5 class="card-title">{item.name}</h5></NavLink>
                    <p class="card-text">{item.location}</p>
                    <p class="card-text"><small class="text-muted">{item.created_at}</small></p>
                    </div>
                </div>
            )}

  
        </div>
    );
  };
   
export default ListHomestay;