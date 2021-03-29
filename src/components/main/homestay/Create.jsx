import React, {Component, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect, NavLink, useRouteMatch } from 'react-router-dom';
import Axios from "axios";
import { stringify } from "querystring";



import CreateHsCommonInfo from './CreateHsCommonInfo'
import CreateHsUtility from './CreateHsUtility'
import CreateHsPolicy from './CreateHsPolicy'
import CreateHsPrice from './CreateHsPrice'
import CreateHsImage from './CreateHsImage'

const Create = () => {
let { path, url } = useRouteMatch();

return (
    
<div className="Create">
    <div className="homestay_create_form mt-4">
        <Switch>
            <Route path={`${path}/1`} component={CreateHsCommonInfo} />
            <Route path={`${path}/2`} component={CreateHsUtility} />
            <Route path={`${path}/3`} component={CreateHsPolicy} />
            <Route path={`${path}/4`} component={CreateHsPrice} />
            <Route path={`${path}/5`} component={CreateHsImage} />
        </Switch>
    </div>

    <div class="pagination_cus mt-5">
        <a class="prev" href=""><span>Trước</span></a>

        <NavLink to={`${url}/1`}><span>1</span></NavLink>
        <NavLink to={`${url}/2`}><span>2</span></NavLink>
        <NavLink to={`${url}/3`}><span>3</span></NavLink>
        <NavLink to={`${url}/4`}><span>4</span></NavLink>
        <NavLink to={`${url}/5`}><span>5</span></NavLink>
   
        <a class="next" href=""><span>Sau</span></a>
    </div>
</div>
);
};

export default Create;