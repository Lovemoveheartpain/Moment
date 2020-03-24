import Axios from 'axios';



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



export function headquarter(mode, url, params) {
    if (mode == 'GET') {
        return get(url, params)
    } else if (mode == 'POST') {
        return post(url, params)
    }
}