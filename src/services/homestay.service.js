import authHeader from '../helpers/auth-header';
import Axios from "axios";

export const homestayService = {
    getHsType,
    storeCommonInfo,
};

const config = {
    headers:  authHeader()
};

function getHsType() {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/homestay-type', config);
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

    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/admin/homestay', postData, config);
    
}
