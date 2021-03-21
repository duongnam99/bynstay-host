import authHeader from '../helpers/auth-header';
import Axios from "axios";

export const homestayService = {
    getHsType,
    storeCommonInfo,
    getUtilityParent,
    getUtilityChild,
    getUtilityChildByParent,
    storeUtility,
    getHsUtil,
};

const config = {
    headers:  authHeader()
};

function getHsType() {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-type', config);
}

function getUtilityParent() {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-utility-parent', config);
}

function getUtilityChildByParent(id) {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-utility-parent/' + id, config);
}

function getUtilityChild() {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-utility-children', config);
}

function getHsUtil(id) {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/hs-util/' + id, config);
}

function storeCommonInfo(data) {
    let postData = {
        name: data.name,
        location: data.location, 
        province_id: data.provinceId, 
        district_id: data.districtId,
        ward_id: data.wardId,
        type_id: data.homestayTypeId 
    }

    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay', postData, config);
}

function storeUtility(data) {

    let postData = {
        homestay_id: 1,
        utility_id: data.utilChildId,
    }

    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-utility', postData, config);
    
}
