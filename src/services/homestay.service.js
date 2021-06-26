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
    getPolicyType,
    storePolicy,
    getHsPolicy,
    storePrice,
    storeImage,
    getHomestay,
    getHsInfo,
    getHsPrice,
    getHsImage,
    updateHsCommon,
    updateUtility,
    deleteUtil,
    deletePolicy,
    updatePrice,
    deleteImage,
    updateHostInfo,
    getCustomer,
    getOrder,
    setOrderStatus,
    requestAprrove
};

const config = {
    headers: authHeader()
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

function getPolicyType() {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/admin/homestay-policy-type', config);
}

function getHsPolicy(id) {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-policy-full/' + id, config);
}

function storeCommonInfo(data) {
    let postData = {
        name: data.name,
        location: data.location, 
        province_id: data.provinceId, 
        district_id: data.districtId,
        ward_id: data.wardId,
        type_id: data.homestayTypeId,
        des: data.des,
        map: data.map,
        // user_id: data.userId
    }

    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay', postData, config);
}

function storeUtility(data) {
    let postData = {
        homestay_id: data.homestayId,
        utility_id: data.utilChildId,
    }

    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-utility', postData, config);
}

function requestAprrove(hsId) {
    let postData = {
        homestay_id: hsId,
    }

    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-approve-request', postData, config);
}

function updateUtility(data) {
    let putData = {
        homestay_id: 1,
        utility_id: data.utilChildId,
    }

    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-utility', putData, config);
}

function deleteUtil(id) {
    return Axios.delete(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-utility/' + id , config);
}

function storePolicy(data) {
    let postData = {
        homestay_id: data.homestayId,
        policy_id: data.policyTypeId,
        content: data.content,
    }

    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-policy', postData, config);
}

function deletePolicy(policy_id) {
    return Axios.delete(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-policy/' + policy_id, config);
}

function deleteImage(image_id) {
    return Axios.delete(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-image/' + image_id, config);
}

function storeImage(data) {
    Axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-image', data, config);
}

function storePrice(data) {
    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-price', data, config);
}

function updatePrice(data) {
    return Axios.put(process.env.REACT_APP_BASE_API_URL + 'api/common/update-homestay-price/' + data.homestay_id, data, config);
}

function setOrderStatus(id, status) {
    let data = {
        order_status: status
    }
    return Axios.put(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-order/' + id, data, config);
}

function getHomestay() {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay', config);
}

function getHsInfo(id) {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay/' + id, config);
}

function getHsPrice(homestay_id) {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/get-homestay-price/' + homestay_id, config);
}

function getHsImage(homestay_id) {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/get-homestay-image/' + homestay_id, config);
}

function getCustomer() {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/customer-by-host', config);
}

function getOrder() {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/order-host', config);
}

function updateHsCommon(data) {
    let putData = {
        name: data.name,
        location: data.location, 
        province_id: data.provinceId, 
        district_id: data.districtId,
        ward_id: data.wardId,
        type_id: data.homestayTypeId,
        des: data.des,
        google_map: data.map 
    }
    return Axios.put(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay/' + data.id, putData, config);
}

function updateHostInfo(data) {
    let putData = {
        name: data.name,
        location: data.location, 
        province_id: data.provinceId, 
        district_id: data.districtId,
        ward_id: data.wardId,
        type_id: data.homestayTypeId 
    }
    return Axios.put(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay/' + data.id, putData, config);
}