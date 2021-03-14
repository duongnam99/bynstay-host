export function authHeader() {
    // return authorization header with jwt token
    let authToken = JSON.parse(localStorage.getItem('auth-token'));

    // if (user && user.token) {
    if (authToken) {
        return { 'Authorization': 'Bearer ' + authToken };
    } else {
        return {};
    }
}