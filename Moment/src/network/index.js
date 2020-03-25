import { headquarter } from './axios'
import init from './config';
function data(params) {//循环拼接参数
    var val = '?';
    for (let i in params) {
        val += `${i}=${params[i]}&`
    }
    val = val.substring(0, val.length - 1)
    return val
}
const login = () => {
    return headquarter(init.path.POST, init.url.login, '')
}
const getBanner = () => {
    return headquarter(init.path.GET, init.url.getBanner, '')
}
const appIndex = () => {
    return headquarter(init.path.GET, init.url.appIndex, '')
}
const system = () => {
    return headquarter(init.path.GET, init.url.system, '')
}
const courseClassify = () => {
    return headquarter(init.path.GET, init.url.courseClassify, '')
}
const courseBasis = (value) => {
    return headquarter(init.path.GET, init.url.courseBasis, data(value))
}
const courseInfo = (value) => {
    return headquarter(init.path.GET, init.url.courseInfo, value)
}




export const bus = {
    login,
    getBanner,
    appIndex,
    system,
    courseClassify,
    courseBasis,
    courseInfo
}