import React, {Component, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect, NavLink, useRouteMatch } from 'react-router-dom';
import {homestayService} from '../../../services/homestay.service'
import { toast } from 'react-toastify';

import EditHomestay from './EditHomestay'

const ListHomestay = () => {
    let { path, url } = useRouteMatch();
    const [homestay, setHomestay] = useState([])

    // const deleteHs = id => {
    //     let result = confirm("Xóa nơi nghỉ dưỡng");
    // }

    const requestAprove = (event, id) => {
        homestayService.requestAprrove(id).then((response) => {
            if(response.data.result !== false) {
                toast.success("Yêu cầu duyệt thành công");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

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
                        <div className="head">
                            <NavLink to={`${url}/edit/${item.id}`}><h5 class="card-title">{item.name}</h5></NavLink>
                            <div className="right">
                                { item.approved == 2 ?
                                    <span class="material-icons " >hourglass_empty</span>
                                    :
                                    <span class={"material-icons r_approve " + (item.approved ? "active" : '')} onClick={(event) => requestAprove(event, item.id)}>beenhere</span>
                                }
                                {/* <span class="material-icons delete_util" onClick={() => deleteHs(item.id)}>delete_outline</span> */}
                            </div>
                        </div>
                    <p class="card-text">{item.location}</p>
                    <p class="card-text"><small class="text-muted">{item.created_at}</small></p>
               
                    </div>
           
                </div>
            )}

  
        </div>
    );
  };
   
export default ListHomestay;