import { authHeader } from '../helpers/auth-header';
import Axios from "axios";

export const userService = {
    login,
    logout,
    register,
    updatePassword,
};

// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function login(email, password) {
    const config = {headers: {'content-type': 'application/x-www-form-urlencoded'}};
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/login', formData, config)
        // .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.data.user));
            localStorage.setItem('auth-token', user.data.token);

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('auth-token');
}


function register(user) {
    const config = {headers: {'content-type': 'application/x-www-form-urlencoded'}};

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('c_password', user.re_pass);
    formData.append('user_type', 1);

    return Axios.post(process.env.REACT_APP_BASE_API_URL + 'api/register', formData, config)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.data.user));
            localStorage.setItem('auth-token', user.data.token);

            return user;
        });

}

const permissionConfig = {
    headers: authHeader()
};

function updatePassword(user) {

    let putData = {
        name: user.name,
        password: user.password, 
        email: user.email, 
        new_password: user.new_password,
        new_cf_password: user.new_cf_password,
    }
    return Axios.put(process.env.REACT_APP_BASE_API_URL + 'api/update-pw/', putData, permissionConfig);

}
