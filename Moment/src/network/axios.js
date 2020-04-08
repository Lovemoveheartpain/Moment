import Axios from 'axios';

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    if (localStorage.adminToken) {//判断是否存在token，如果存在的话，则每个http的header都加上token
        config.headers['authorization'] = 'Bearer' + localStorage.adminToken;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


function get(url, params) {
    return new Promise((resolve, reject) => {
        Axios.get(url + params).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

function post(url, params) {
    return new Promise((resolve, reject) => {
        Axios.post(url + params).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

function put(url, params) {
    return new Promise((resolve, reject) => {
        Axios.put(url + params).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}



export function headquarter(mode, url, params) {
    if (mode == 'GET') {
        return get(url, params)
    } else if (mode == 'POST') {
        return post(url, params)
    } else if (mode == 'PUT') {
        return put(url, params)
    }
}