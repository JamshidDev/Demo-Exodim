import axios from "axios";
import router from "../router/index"
const instance = axios.create({
    baseURL: `http://exodim.railway.uz`
});

instance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('access_token') ? sessionStorage.getItem('access_token') : null;
    if (token) {
        config.headers.common['Access-Control-Allow-Origin'] = '*'
        config.headers.common['Authorization'] = 'Bearer ' + token
    }

    return config;
})

instance.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status==401){
            router.push("/login")
        }
        return Promise.reject(error)
    }
);

export default instance