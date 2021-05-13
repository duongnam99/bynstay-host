import React, {Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import { stringify } from "querystring";
import { ToastContainer, toast } from 'react-toastify';
import {homestayService} from '../../../services/homestay.service'

const CreateHsPolicy = () => {
    const history = useHistory();

    const [policyType, setPolicyType] = useState([])
    const [content, setContent] = useState("")
    const [policyTypeId, setPolicyTypeId] = useState()
    const [storedPolicy, setStoredPolicy] = useState([])

    const [isValidateError, setValidateError] = useState(false)
    const [validatorMes, setValidatorMes] = useState([])

    const handleChangePolicy = event => { setPolicyTypeId(event.target.value) }

    const handleChangeContent = event => {setContent(event.target.value)}

    const postData = event => {
        let data = {
            policyTypeId: policyTypeId,
            content: content,
            homestayId: createHs.id
        }
        let createHs = JSON.parse(localStorage.getItem('create-homestay'));

        homestayService.storePolicy(data).then((response) => {
            if (response.data.status === false) {
                toast.warning(response.data.message);
            } else {
                toast.success("Lưu thành công");
                setValidateError(false);
            }


            homestayService.getHsPolicy(1).then((response) => {
                setStoredPolicy(response.data)
            })

            // history.push("/homestay/create/4");
        }).catch(error => {
            setValidateError(true);
            let errorData = error.response.data;
            
            toast.error(errorData.message);
            setValidatorMes(errorData.data)
        
        })
    }

    useEffect(() => {
        if (!localStorage.getItem('create-homestay')) {
            history.push("/home/homestay/create/1");
        }
        homestayService.getPolicyType().then((response) => {
            setPolicyType(response.data)
        }).catch((error) => {
            console.log(error);
        });

    }, [])

    return (
        <div className="creatHsUtility">
            <h4>Cài đặt chính sách</h4>
            <div className="position-relative">
                <div className="box">
                    <label htmlFor="" className="d-block">Loại chính sách</label>
                    <select id="policy_parent" value={policyTypeId} onChange={handleChangePolicy}>
                        {policyType.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                    </select>
                </div>
            </div>
   
            <div className="position-relative">
                <div className="box">
                    <label htmlFor="" className="d-block">Nội dung</label>
                    <textarea onChange={handleChangeContent} id="" className="w-100" name="" rows="4" cols="50"></textarea>

                    <span className={"validator_error " + (isValidateError && validatorMes.content ? 'visible' : 'invisible')}>*{validatorMes.content}</span>
                </div>
            </div>

            <button onClick={postData} className="addHomestay mt-3">Thêm</button>


            {storedPolicy.map((item, i) => <div className="mt-3">
                <h5 className="util_line">{item.name}</h5>
                 <span className="d-block">- {item.content}</span>
            </div> )}
   

        </div>
    );
  };
   
export default CreateHsPolicy;