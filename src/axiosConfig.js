import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000',

})
let token = window.localStorage.getItem('persist:auth') && JSON.parse(window.localStorage.getItem('persist:auth'))?.token?.slice(1, -1)
   
    console.log(token)

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
    // Do something before request is sent
    // gắn token vào header

    config.headers = {
        ...config.headers,
        authorization: token ? `Bearer ${token}` : 'khooiiooi'
    }
    console.log(token)

    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // refresh token

    return response;
}, function (error) {
    return Promise.reject(error);
});


export default instance