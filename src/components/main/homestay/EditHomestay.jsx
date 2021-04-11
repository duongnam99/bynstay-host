import React, {Component, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect, NavLink, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Axios from "axios";
import { stringify } from "querystring";
import {locationService} from '../../../services/location.service'
import {homestayService} from '../../../services/homestay.service'
import { ToastContainer, toast } from 'react-toastify';
import {useDropzone} from 'react-dropzone'


const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};
  

const EditHomestay = () => {
    let { path, url } = useRouteMatch();
    const { id } = useParams();

    const [loading, setLoading] = useState(false)
    const [isValidateError, setValidateError] = useState(false)
    const [validatorMes, setValidatorMes] = useState([])
    const history = useHistory();

    // common
    const [hsCommon, setHsCommon] = useState([]);

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [provinceId, setProvinceId] = useState()
    const [districtId, setDistrictId] = useState()
    const [ward, setWard] = useState([])
    const [wardId, setWardId] = useState()

    const [homestayTypes, setHomestayTypes] = useState([])
    const [homestayTypeId, setHomestayTypeId] = useState(1)

    // util
    const [utilParent, setUtilParent] = useState([])
    const [util, setUtil] = useState([])
    const [utilChild, setUtilChild] = useState([])
    const [utilParentId, setUtilParentId] = useState(1)
    const [utilChildId, setUtilChildId] = useState(1)

    const [policyType, setPolicyType] = useState([])
    const [content, setContent] = useState("")
    const [policyTypeId, setPolicyTypeId] = useState()
    const [storedPolicy, setStoredPolicy] = useState([])

    // price
    const [hsPrice, setHsPrice] = useState([])
    const [normalPrice, setNormalPrice] = useState()
    const [specialPrice, setSpecialPrice] = useState()
    const [maxNight, setMaxNight] = useState()
    const [maxPeople, setMaxPeople] = useState([])
    const [sideFee, setSideFee] = useState([])

    // image
    const [hsImage, setHsImage] = useState([]);
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
    const postDataImage = () => {
        let formData = new FormData();
    
        files.map(file => {
            formData.append('file[]', file)            
        })
        formData.append('homestay_id', 1)            

        homestayService.storeImage(formData).then((response) => {
            toast.success("Lưu thành công");
            setValidateError(false);

            homestayService.getHsImage(id).then((response) => {
                setHsImage(response.data)
            })
        })
    }


    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
        <div style={thumbInner}>
            <img
            src={file.preview}
            style={img}
            />
        </div>
    </div>
    ));

    const handleChangePolicy = event => { setPolicyTypeId(event.target.value) }

    const handleChangeContent = event => {setContent(event.target.value)}

    const handleChangeUtil = event => {
        setUtilParentId(event.target.value);
        homestayService.getUtilityChildByParent(event.target.value).then((response) => {
            console.log(response.data)
            setUtilChild(response.data)
            setUtilChildId(response.data[0].id)
        }).catch((error) => {
            console.log(error);
        });
    }
    const handleChangeUtilChild = event => {setUtilChildId(event.target.value)}

    const handleChangeNormalPrice = event => { setNormalPrice(event.target.value) }
    const handleChangeSpecialPrice = event => { setSpecialPrice(event.target.value) }
    const handleChangeMaxNight = event => { setMaxNight(event.target.value) }
    const handleChangeMaxPeople = event => { setMaxPeople(event.target.value) }
    const handleChangeSideFee = event => { setSideFee(event.target.value) }


    const postDataPrice = event => {
        let data = {
            homestay_id: id,
            price_normal: normalPrice,
            price_special: specialPrice,
            max_guest: maxPeople,
            max_night: maxNight,
            price_expense: sideFee,
        }
        homestayService.updatePrice(data).then((response) => {
            if (response.data.status === false) {
                toast.warning(response.data.message);
            } else {
                toast.success("Lưu thành công");
                setValidateError(false);
            }

        }).catch(error => {
            setValidateError(true);
            let errorData = error.response.data;
            
            toast.error(errorData.message);
            setValidatorMes(errorData.data)
        
        })
    }

    const postDataPolicy = event => {
        let data = {
            policyTypeId: policyTypeId,
            content: content,
        }

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
    const postDataUtility = event => {
        let data = {
            utilChildId: utilChildId,
        }

        homestayService.updateUtility(data).then((response) => {
            if (response.data.status === false) {
                toast.warning(response.data.message);
            } else {
                toast.success("Lưu thành công");
                setValidateError(false);
            }

            homestayService.getHsUtil(id).then((response) => {
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
    const handleChangeProvince = event => {
        setProvinceId(event.target.value);
    }
    const handleChangeDistrict = event => {
        setDistrictId(event.target.value);
    }

    const postDataCommon = event => {

        let data = {
            id: id,
            name: name,
            location: location,
            provinceId: provinceId,
            districtId: districtId,
            wardId: wardId, 
            homestayTypeId: homestayTypeId,
        }

        homestayService.updateHsCommon(data).then((response) => {
            toast.success("Lưu thành công");
            setValidateError(false);
            // history.push("/homestay/create/2");
        }).catch(error => {
            setValidateError(true);
            let errorData = error.response.data;
            
            toast.error(errorData.message);
            setValidatorMes(errorData.data)
        
        })
    }

    const handleChangeWard = event => setWardId(event.target.value);
    const handleChangeHsType = event => setHomestayTypeId(event.target.value);
    
    const deleteUtil = util_id => {
        homestayService.deleteUtil(util_id).then((response) => {
            if (response.data.status === true) {
                toast.info("Xóa thành công");
                setValidateError(false);

                homestayService.getHsUtil(id).then((response) => {
                    setUtil(response.data)
                })
            } 

        }).catch(error => {
           
        })
    }

    const deletePolicy = policy_id => {
        homestayService.deletePolicy(policy_id).then((response) => {
            if (response.data.status === true) {
                toast.info("Xóa thành công");
                setValidateError(false);

                homestayService.getHsPolicy(id).then((response) => {
                    setStoredPolicy(response.data)
                })
            } 

        }).catch(error => {
           
        })
    }

    const deleteImage = image_id => {
        homestayService.deleteImage(image_id).then((response) => {
            if (response.data.status === true) {
                toast.info("Xóa thành công");
                setValidateError(false);

                homestayService.getHsImage(id).then((response) => {
                    setHsImage(response.data)
                })
            } 

        }).catch(error => {
           
        })
    }
  

    useEffect(() => {

        homestayService.getHsInfo(id).then((response) => {
            setHsCommon(response.data)
            setName(response.data.name)
            setLocation(response.data.location)
            setHomestayTypeId(response.data.type_id)
            setProvinceId(response.data.location_info.province_id)
            setDistrictId(response.data.location_info.district_id)
            setWardId(response.data.location_info.ward_id)
            setHomestayTypeId(response.data.type_id)

            locationService.getDistrictsByProvince(response.data.location_info.province_id).then((response) => {
                setDistrict(response.data)
            })

            locationService.getWardByDistrict(response.data.location_info.district_id).then((response) => {
                setWard(response.data)
            })

        }).catch((error) => {
            console.log(error);
        });
        
        
        homestayService.getHsUtil(id).then((response) => {
            setUtil(response.data)
        })

        homestayService.getHsPolicy(id).then((response) => {
            setStoredPolicy(response.data)
        })

        homestayService.getHsPrice(id).then((response) => {
            setHsPrice(response.data)
            setNormalPrice(response.data.price_normal)
            setSpecialPrice(response.data.price_special)
            setSideFee(response.data.price_expense)
            setMaxNight(response.data.max_night)
            setMaxPeople(response.data.max_guest)
        })

        homestayService.getHsImage(id).then((response) => {
            setHsImage(response.data)
        })

        locationService.getProvinces().then((response) => {
            setProvince(response.data)
        }).catch((error) => {
            console.log(error);
        });

        homestayService.getHsType().then((response) => {
            setHomestayTypes(response.data)
        }).catch((error) => {
            console.log(error);
        });

        homestayService.getUtilityParent().then((response) => {
            setUtilParent(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        });

        homestayService.getPolicyType().then((response) => {
            setPolicyType(response.data)
        }).catch((error) => {
            console.log(error);
        });
     
    }, [])

    return (
        
    <div className="Create">

        <div className="homestay_create_form mt-4">
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
                    <select id="hs_type" value={homestayTypeId} onChange={handleChangeHsType}>
                        {homestayTypes.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                    </select>
                    <span className={"validator_error " + (isValidateError && validatorMes.type_id ? 'visible' : 'invisible')}>*{validatorMes.type_id}</span>
                </div>
            </div>
            <button onClick={postDataCommon} className="addHomestay mt-3">Lưu thông tin cơ bản</button>

            
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

            {Object.keys(util).map((i,ind) => <div className="mt-3">
                <h5 className="util_line">{i}</h5>
                {util[i].map((item, i) => <span className="d-block">- <span class="material-icons delete_util" onClick={() => deleteUtil(item.id)}>delete_outline</span> {item.name}  </span>    )}
            </div> )}

            <button onClick={postDataUtility} className="addHomestay mt-3">Lưu tiện ích</button>
            
             <h4 className="mt-4">Cài đặt chính sách</h4>
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

            {storedPolicy.map((item, i) => <div className="mt-3">
                <div className="util_line "><span onClick={() => deletePolicy(item.id)} class="material-icons delete_ic delete_policy">delete_outline</span><h5 className="d-inline"> {item.name}</h5></div>
                <span className="d-block">{item.content}</span>
            </div> )}

            <button onClick={postDataPolicy} className="addHomestay mt-3">Lưu chính sách</button>

            
            <h4 className="mt-4">Cài đặt giá</h4>
            <div className="position-relative">
                <div className="box">
                    <label htmlFor="" className="d-block">Giá thường nhật</label>
                    <input type="text" value={normalPrice} onChange={handleChangeNormalPrice} class="input-name-address" placeholder="Giá thường nhật / ngày (VND)" />
                    <span className={"validator_error " + (isValidateError && validatorMes.price_normal ? 'visible' : 'invisible')}>*{validatorMes.price_normal}</span>
                </div>
                <div className="box">
                    <label htmlFor="" className="d-block">Giá ngày đặc biệt</label>
                    <input type="text" value={specialPrice} onChange={handleChangeSpecialPrice} class="input-name-address" placeholder="Giá ngày đặc biệt / ngày (VND)" />
                    <span className={"validator_error " + (isValidateError && validatorMes.price_special ? 'visible' : 'invisible')}>*{validatorMes.price_special}</span>
                </div>
            </div>
   
            <div className="position-relative">
                <div className="box">
                    <label htmlFor="" className="d-block">Số ngày thuê tối đa</label>
                    <input type="number" value={maxNight} onChange={handleChangeMaxNight} class="input-name-address" placeholder="Số ngày thuê tối đa" />
                    <span className={"validator_error " + (isValidateError && validatorMes.max_night ? 'visible' : 'invisible')}>*{validatorMes.max_night}</span>
                </div>
                <div className="box">
                    <label htmlFor="" className="d-block">Số khách tối đa (quota)</label>
                    <input type="number" value={maxPeople} onChange={handleChangeMaxPeople} class="input-name-address" placeholder="Số khách tối đa" />
                    <span className={"validator_error " + (isValidateError && validatorMes.max_guest ? 'visible' : 'invisible')}>*{validatorMes.max_guest}</span>
                </div>
                <div className="box">
                    <label htmlFor="" className="d-block">Chi phí trên 1 khách vượt quota</label>
                    <input type="text" value={sideFee} onChange={handleChangeSideFee} class="input-name-address" placeholder="Chi phí phụ thêm" />
                    <span className={"validator_error " + (isValidateError && validatorMes.price_expense ? 'visible' : 'invisible')}>*{validatorMes.price_expense}</span>
                </div>
            </div>
            <button onClick={postDataPrice} className="addHomestay mt-3">Lưu Giá</button>


            <h4>Cài đặt Ảnh</h4>
            <div className="edit_hs_list_img">
            {hsImage.map((item, i) => 
                <div className="wrap-img">
                    <button class="delete_button" onClick={() => deleteImage(item.id)}>-</button>
                    <img className="" src={item.url} />
                </div>
 
            )}
            </div>
     
            <div {...getRootProps({className: 'dropzone mt-4'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>

            <button onClick={postDataImage} className="addHomestay mt-3">Lưu Ảnh</button>
        </div>
    </div>
    </div>
    );
};

export default EditHomestay;