import React, {Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import { stringify } from "querystring";
import { ToastContainer, toast } from 'react-toastify';
import {homestayService} from '../../../services/homestay.service'



const CreateHsPrice = () => {
    const history = useHistory();

    const [normalPrice, setNormalPrice] = useState()
    const [specialPrice, setSpecialPrice] = useState()
    const [maxNight, setMaxNight] = useState()
    const [maxPeople, setMaxPeople] = useState([])
    const [sideFree, setSideFree] = useState([])

    const [isValidateError, setValidateError] = useState(false)
    const [validatorMes, setValidatorMes] = useState([])

    const handleChangeNormalPrice = event => { setNormalPrice(event.target.value) }
    const handleChangeSpecialPrice = event => { setSpecialPrice(event.target.value) }
    const handleChangeMaxNight = event => { setMaxNight(event.target.value) }
    const handleChangeMaxPeople = event => { setMaxPeople(event.target.value) }
    const handleChangeSideFree = event => { setSideFree(event.target.value) }


    const postData = event => {
        let createHs = JSON.parse(localStorage.getItem('create-homestay'));

        let data = {
            homestay_id: createHs.id,
            price_normal: normalPrice,
            price_special: specialPrice,
            max_guest: maxNight,
            max_night: maxPeople,
            price_expense: sideFree,
        }

        homestayService.storePrice(data).then((response) => {
            if (response.data.status === false) {
                toast.warning(response.data.message);
            } else {
                toast.success("Lưu thành công");
                setValidateError(false);
            }

            history.push("/home/homestay/create/5");
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

    }, [])

    return (
        <div className="creatHsUtility">
            <h4>Cài đặt giá</h4>
            <div className="position-relative">
                <div className="box">
                    <label htmlFor="" className="d-block">Giá thường nhật</label>
                    <input type="text" onChange={handleChangeNormalPrice} class="input-name-address" placeholder="Giá thường nhật / ngày (VND)" />
                    <span className={"validator_error " + (isValidateError && validatorMes.price_normal ? 'visible' : 'invisible')}>*{validatorMes.price_normal}</span>
                </div>
                <div className="box">
                    <label htmlFor="" className="d-block">Giá ngày đặc biệt</label>
                    <input type="text" onChange={handleChangeSpecialPrice} class="input-name-address" placeholder="Giá ngày đặc biệt / ngày (VND)" />
                    <span className={"validator_error " + (isValidateError && validatorMes.price_special ? 'visible' : 'invisible')}>*{validatorMes.price_special}</span>
                </div>
            </div>
   
            <div className="position-relative">
                <div className="box">
                    <label htmlFor="" className="d-block">Số ngày thuê tối đa</label>
                    <input type="number" onChange={handleChangeMaxNight} class="input-name-address" placeholder="Số ngày thuê tối đa" />
                    <span className={"validator_error " + (isValidateError && validatorMes.max_night ? 'visible' : 'invisible')}>*{validatorMes.max_night}</span>
                </div>
                <div className="box">
                    <label htmlFor="" className="d-block">Số khách tối đa (quota)</label>
                    <input type="number" onChange={handleChangeMaxPeople} class="input-name-address" placeholder="Số khách tối đa" />
                    <span className={"validator_error " + (isValidateError && validatorMes.max_guest ? 'visible' : 'invisible')}>*{validatorMes.max_guest}</span>
                </div>
                <div className="box">
                    <label htmlFor="" className="d-block">Chi phí trên 1 khách vượt quota</label>
                    <input type="text" onChange={handleChangeSideFree} class="input-name-address" placeholder="Chi phí phụ thêm" />
                    <span className={"validator_error " + (isValidateError && validatorMes.price_expense ? 'visible' : 'invisible')}>*{validatorMes.price_expense}</span>
                </div>
            </div>

            <button onClick={postData} className="addHomestay mt-3">Thêm</button>

        </div>
    );
  };
   
export default CreateHsPrice;