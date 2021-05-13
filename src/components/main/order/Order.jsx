import React, {Component, useState, useEffect } from 'react';
import {useHistory, useRouteMatch } from 'react-router-dom';
import {homestayService} from '../../../services/homestay.service'
import { ToastContainer, toast } from 'react-toastify';

const Order = () => {
    let { path, url } = useRouteMatch();
    const [orders, setOrders] = useState([])
    const [orderStatus, setOrderStatus] = useState([])

    const handleChangeorderStatus = (id, status) => {
        // setOrderStatus(event.targat.value);
        homestayService.setOrderStatus(id, status).then((response) => {

        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        homestayService.getOrder().then((response) => {
            setOrders(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    return (
        <div className="table_custom_host table_custom_order">
            <h4>Danh sách đặt chỗ</h4>
            <div class="table100 ver1 m-b-110 mt-4">
					<div class="table100-head">
						<table>
							<thead>
								<tr class="row100 head">
                                <th class="cell100 column1">Thanh toán</th>
									<th class="cell100 column1">Trạng thái</th>
									<th class="cell100 column1">Ngày đến</th>
									<th class="cell100 column1">Ngày đi</th>
									<th class="cell100 column1">Số khách</th>
									<th class="cell100 column1">Số đêm</th>
									<th class="cell100 column1">Email</th>
									<th class="cell100 column2">Tên</th>
									<th class="cell100 column4">Số điện thoại</th>
									<th class="cell100 column4">Mã đặt phòng</th>
								</tr>
							</thead>
                            <tbody>
							{orders.map((item,i) => 
								<tr class="row100 body">
									<td class="cell100 column1">{item.payment_status == 1 ? <b>Đã thanh toán - FasterPay</b> : <span>Chưa thanh toán</span> }</td>
									<td class="cell100 column2">
                                        {/* {item.order_status == 0 ? "Mở" : "Đóng"} */}
                                        <select onClick={() => handleChangeorderStatus(item.id, 0)} value={item.order_status} id="order_status">
                                            <option value="0">Mở</option>
                                            <option value="1">Đóng</option>
                                        </select>
                                    </td>
									<td class="cell100 column3">{item.start_date}</td>
									<td class="cell100 column3">{item.end_date}</td>
									<td class="cell100 column3">{item.num_guess}</td>
									<td class="cell100 column3">{item.num_night}</td>
									<td class="cell100 column3">{item.customer_email}</td>
									<td class="cell100 column3">{item.customer_name}</td>
									<td class="cell100 column3">{item.customer_phone}</td>
									<td class="cell100 column3">{item.success_code}</td>
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
   
export default Order;