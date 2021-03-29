import React, {Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import { stringify } from "querystring";
import { ToastContainer, toast } from 'react-toastify';
import {homestayService} from '../../../services/homestay.service'



const CreateHsUtility = () => {
    const history = useHistory();

    const [utilParent, setUtilParent] = useState([])
    const [util, setUtil] = useState([])
    const [utilChild, setUtilChild] = useState([])
    const [utilParentId, setUtilParentId] = useState(1)
    const [utilChildId, setUtilChildId] = useState(1)
    const [isValidateError, setValidateError] = useState(false)
    const [validatorMes, setValidatorMes] = useState([])

    const handleChangeUtil = event => {
        setUtilParentId(event.target.value);
        homestayService.getUtilityChildByParent(event.target.value).then((response) => {
            setUtilChild(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }
    const handleChangeUtilChild = event => {setUtilChildId(event.target.value)}

    const postData = event => {
        let data = {
            utilChildId: utilChildId,
        }

        homestayService.storeUtility(data).then((response) => {
            if (response.data.status === false) {
                toast.warning(response.data.message);
            } else {
                toast.success("Lưu thành công");
                setValidateError(false);
            }

            homestayService.getHsUtil(1).then((response) => {
                setUtil(response.data)
            })

            // history.push("/homestay/create/3");
        }).catch(error => {
            setValidateError(true);
            let errorData = error.response.data;
            
            toast.error(errorData.message);
            setValidatorMes(errorData.data)
        
        })
    }

    useEffect(() => {
        
        homestayService.getUtilityParent().then((response) => {
            setUtilParent(response.data)
        }).catch((error) => {
            console.log(error);
        });

    }, [])

    return (
        <div className="creatHsUtility">
            <h4>Cài đặt tiện ích</h4>
            <div className="position-relative">
                <div className="box">
                    <label htmlFor="" className="d-block">Loại tiện tích</label>
                    <select id="util_parent" value={utilParentId} onChange={handleChangeUtil}>
                        {utilParent.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="box">
                    <label htmlFor="" className="d-block">Tiện tích</label>
                    <select id="util_parent" value={utilChildId} onChange={handleChangeUtilChild}>
                        {utilChild.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                    </select>
                    <span className={"validator_error " + (isValidateError && validatorMes.utility_id ? 'visible' : 'invisible')}>*{validatorMes.utility_id}</span>
                </div>
            </div>
            <button onClick={postData} className="addHomestay mt-3">Thêm</button>

            {/* {util.map((item,i) => <span className="d-block">{item.i}</span> )} */}
            {Object.keys(util).map((i,ind) => <div className="mt-3">
                <h5 className="util_line">{i}</h5>
                {util[i].map((item, i) => <span className="d-block">- {item.name}</span>)}
            </div> )}

        </div>
    );
  };
   
export default CreateHsUtility;