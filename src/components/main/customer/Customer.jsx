import React, {Component, useState, useEffect } from 'react';
import {useHistory, useRouteMatch } from 'react-router-dom';
import Axios from "axios";
import { stringify } from "querystring";
import {locationService} from '../../../services/location.service'
import {homestayService} from '../../../services/homestay.service'
import { ToastContainer, toast } from 'react-toastify';

const Customer = () => {
    let { path, url } = useRouteMatch();
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        homestayService.getCustomer().then((response) => {
            setCustomers(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    return (
        <div className="table_custom_host">
            <h4>Danh sách khách hàng</h4>
            <div class="table100 ver1 m-b-110 mt-4">
					<div class="table100-head">
						<table>
							<thead>
								<tr class="row100 head">
									<th class="cell100 column1">Email</th>
									<th class="cell100 column2">Tên</th>
									<th class="cell100 column4">Số điện thoại</th>
									{/* <th class="cell100 column5">Spots</th> */}
								</tr>
							</thead>
						</table>
					</div>

					<div class="table100-body js-pscroll">
						<table>
							<tbody>
							{customers.map((item,i) => 
								<tr class="row100 body">
									<td class="cell100 column1">{item.customer_email}</td>
									<td class="cell100 column2">{item.customer_name}</td>
									<td class="cell100 column3">{item.customer_phone}</td>
									{/* <td class="cell100 column4">Aaron Chapman</td>
									<td class="cell100 column5">10</td> */}
								</tr>
							)}
								
                            </tbody>
						</table>
					</div>
				</div>
				
        </div>
    );
  };
   
export default Customer;