import React, {Component, useState, useEffect } from 'react';
import {useHistory } from 'react-router-dom';
import Axios from "axios";
import { stringify } from "querystring";
import {locationService} from '../../../services/location.service'
import {homestayService} from '../../../services/homestay.service'
import { ToastContainer, toast } from 'react-toastify';

const CreateHsCommonInfo = () => {
    const history = useHistory();

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [provinceId, setProvinceId] = useState(1)
    const [districtId, setDistrictId] = useState(1)
    const [ward, setWard] = useState([])
    const [wardId, setWardId] = useState(1)
    const [des, setDes] = useState('')
    const [map, setMap] = useState('')

    const [homestayTypes, setHomestayTypes] = useState([])
    const [homestayTypeId, setHomestayTypeId] = useState(1)

    const [loading, setLoading] = useState(false)
    const [isValidateError, setValidateError] = useState(false)
    const [validatorMes, setValidatorMes] = useState([])

    const handleChangeProvince = event => {
        setProvinceId(event.target.value);
        locationService.getDistrictsByProvince(event.target.value).then((response) => {
            setDistrict(response.data)
        })
    }
    const handleChangeDistrict = event => {
        setDistrictId(event.target.value);
        locationService.getWardByDistrict(event.target.value).then((response) => {
            setWard(response.data)
        })
    }

    const postData = event => {
        // let userInfo = JSON.parse(localStorage.getItem('user'));
        let data = {
            // userId: userInfo.id,
            name: name,
            location: location,
            provinceId: provinceId,
            districtId: districtId,
            wardId: wardId,
            homestayTypeId: homestayTypeId,
            des: des,
            map: map,
        }

        homestayService.storeCommonInfo(data).then((response) => {
            toast.success("Lưu thành công");
            setValidateError(false);
            localStorage.setItem('create-homestay', JSON.stringify(response.data));

            history.push("/home/homestay/create/2");

        }).catch(error => {
            setValidateError(true);
            let errorData = error.response.data;
            
            toast.error(errorData.message);
            setValidatorMes(errorData.data)
        
        })
    }

    const handleChangeWard = event => setWardId(event.target.value);
    const handleChangeDes = event => setDes(event.target.value);
    const handleChangeMap = event => setMap(event.target.value);
    const handleChangeHsType = event => setHomestayTypeId(event.target.value);

    useEffect(() => {
        
        locationService.getProvinces().then((response) => {
            setProvince(response.data)
            setProvinceId(response.data[0].id);
            locationService.getDistrictsByProvince(response.data[0].id).then((response) => {
                setDistrict(response.data)
            })

        }).catch((error) => {
            console.log(error);
        });

        homestayService.getHsType().then((response) => {
            setHomestayTypes(response.data)
        }).catch((error) => {
            console.log(error);
        });

     
    }, [])

    return (
        <div className="creatHsCommon">
            <h4>Cài đặt thông tin chung</h4>
            <div className="input-address">
            <div className="position-relative">
                <div className="box">
                    <input type="text" value={name} onChange={event => setName(event.target.value)} class="input-name-address" placeholder="Tên nơi nghỉ dưỡng..." />
                    <span className={"validator_error " + (isValidateError && validatorMes.name ? 'visible' : 'invisible')}>*{validatorMes.name}</span>
                </div>
                <div className="box">
                    <input type="text" value={location} onChange={event => setLocation(event.target.value)} class="input-name-address" placeholder="Địa điểm" />
                    <span className={"validator_error " + (isValidateError && validatorMes.location ? 'visible' : 'invisible')}>*{validatorMes.location}</span>
                </div>
            </div>

            <div className="position-relative">

                <div className="box">
                    <label htmlFor="" className="d-block">Tỉnh/ Thành Phố</label>
                    <select id="province" value={provinceId} onChange={handleChangeProvince}>
                        {province.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                    </select>
                    <span className={"validator_error " + (isValidateError && validatorMes.province_id ? 'visible' : 'invisible')}>*{validatorMes.province_id}</span>
                </div>

                <div className="box">
                    <label htmlFor="" className="d-block">Quận/Huyện</label>
                    <select id="district" value={districtId} onChange={handleChangeDistrict}>
                        {district.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                    </select>
                </div>

                <div className="box">
                    <label htmlFor="" className="d-block">Xã/phường</label>
                    <select id="ward" onChange={handleChangeWard}>
                        {ward.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="position-relative">

                <div className="box">
                    <label htmlFor="" className="d-block">Loại nơi nghỉ dưỡng</label>
                    <select id="hs_type" onChange={handleChangeHsType}>
                        {homestayTypes.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                    </select>
                    <span className={"validator_error " + (isValidateError && validatorMes.type_id ? 'visible' : 'invisible')}>*{validatorMes.type_id}</span>
                </div>

            </div>
            <div className="position-relative">
                <div className="box">
                    <label htmlFor="" className="d-block">Mổ tả (có thể bổ sung sau)</label>
                    <textarea onChange={handleChangeDes} id="" className="w-100" name="" rows="4" cols="50"></textarea>

                    <span className={"validator_error " + (isValidateError && validatorMes.des ? 'visible' : 'invisible')}>*{validatorMes.des}</span>
                </div>
            </div>
            <div className="position-relative">
                <div className="box">
                    <label htmlFor="" className="d-block">Ifame Bản đồ (có thể bổ sung sau)</label>
                    <input type="text" onChange={handleChangeMap} class="input-name-address" placeholder="Iframe bản đồ" />

                    {/* <textarea onChange={handleChangeMap} id="" className="w-100" name="" rows="4" cols="50"></textarea> */}

                    <span className={"validator_error " + (isValidateError && validatorMes.map ? 'visible' : 'invisible')}>*{validatorMes.map}</span>
                </div>
            </div>
                
            <button onClick={postData} className="addHomestay mt-3">Lưu</button>
        </div>
    
        </div>
    );
  };
   
export default CreateHsCommonInfo;