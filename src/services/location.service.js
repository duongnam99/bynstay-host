import authHeader from '../helpers/auth-header';
import Axios from "axios";

export const locationService = {
    getProvinces,
    getDistrictsByProvince,
    getWardByDistrict,
};

const config = {
    headers:  authHeader()
};

function getProvinces() {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/location/province', config);
}

function getDistrictsByProvince(id) {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/location/province/' + id, config);
}

function getWardByDistrict(id) {
    return Axios.get(process.env.REACT_APP_BASE_API_URL + 'api/common/location/district/' + id, config);
}
