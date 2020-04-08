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
const getBanner = () => {
    return headquarter(init.path.GET, init.url.getBanner, '')
}
const appIndex = () => {
    return headquarter(init.path.GET, init.url.appIndex, '')
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
const otoCourseOptions = (value) => {
    return headquarter(init.path.GET, init.url.otoCourseOptions, value)
}
const otoCourse = (value) => {
    return headquarter(init.path.GET, init.url.otoCourse, value)
}
const login = (value) => {
    return headquarter(init.path.POST, init.url.login, data(value))
}
const getTeacher = (value) => {
    return headquarter(init.path.GET, init.url.getTeacher, value)
}
const getTeacherInfo = (value) => {
    return headquarter(init.path.GET, init.url.getTeacherInfo, value)
}
const invite = (value) => {
    return headquarter(init.path.POST, init.url.invite, data(value))
}
const collect = (value) => {
    return headquarter(init.path.GET, init.url.collect, value)
}
const mainCourse = (value) => {
    return headquarter(init.path.POST, init.url.mainCourse, data(value))
}
const collectKe = (value) => {
    return headquarter(init.path.POST, init.url.collectKe, data(value))
}
const cancel_collectKe = (value) => {
    return headquarter(init.path.PUT, init.url.cancel_collectKe, value + '/1')
}
const getUCenterInfo = () => {
    return headquarter(init.path.GET, init.url.getUCenterInfo, '')
}



export const bus = {
    getBanner,
    appIndex,
    courseClassify,
    courseBasis,
    courseInfo,
    otoCourseOptions,
    otoCourse,
    login,
    getTeacher,
    getTeacherInfo,
    invite,
    collect,
    mainCourse,
    collectKe,
    cancel_collectKe,
    getUCenterInfo
}