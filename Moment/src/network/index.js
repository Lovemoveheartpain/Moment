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
    return headquarter(init.path.POST, init.url.login, value)
}
const getTeacher = (value) => {
    return headquarter(init.path.GET, init.url.getTeacher, value)
}
const getTeacherInfo = (value) => {
    return headquarter(init.path.GET, init.url.getTeacherInfo, value)
}
const invite = (value) => {
    return headquarter(init.path.POST, init.url.invite, value)
}
const collect = (value) => {
    return headquarter(init.path.GET, init.url.collect, value)
}
const mainCourse = (value) => {
    return headquarter(init.path.POST, init.url.mainCourse, value)
}
const collectKe = (value) => {
    return headquarter(init.path.POST, init.url.collectKe, value)
}
const cancel_collectKe = (value) => {
    return headquarter(init.path.PUT, init.url.cancel_collectKe, value + '/1')
}
const getUCenterInfo = () => {
    return headquarter(init.path.GET, init.url.getUCenterInfo, '')
}
const coinRank = () => {
    return headquarter(init.path.GET, init.url.coinRank, '')
}
const pay = (value) => {
    return headquarter(init.path.POST, init.url.pay, value)
}
const feedback = (value) => {
    return headquarter(init.path.POST, init.url.feedback, value)
}
const userInfo = () => {
    return headquarter(init.path.GET, init.url.userInfo, '')
}
const grade = () => {
    return headquarter(init.path.GET, init.url.grade, '')
}
const downOrder = (value) => {
    return headquarter(init.path.POST, init.url.downOrder, value)
}
const collectTeacher = (value) => {
    return headquarter(init.path.GET, init.url.collectTeacher, data(value))
}

const cancel_collectTeacher = (value) => {
    return headquarter(init.path.PUT, init.url.cancel_collectKe, value + '/2')
}
const attribute = () => {
    return headquarter(init.path.GET, init.url.attribute, '')
}
const user = (value) => {
    return headquarter(init.path.PUT, init.url.user, data(value))
}
const img = (value) => {
    console.log(value);
    return headquarter(init.path.POST, init.url.img, value)
}
const sonArea = (value) => {
    return headquarter(init.path.GET, init.url.sonArea, value)
}
const myStudy = (value) => {
    return headquarter(init.path.GET, init.url.myStudy, value)
}
const myStudyCourse = (value) => {
    return headquarter(init.path.GET, init.url.myStudyCourse, value)
}
const deleteStudyCourse = (value) => {
    return headquarter(init.path.DELETE, init.url.myStudyCourse, value)
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
    getUCenterInfo,
    coinRank,
    pay,
    feedback,
    userInfo,
    grade,
    downOrder,
    collectTeacher,
    cancel_collectTeacher,
    attribute,
    user,
    img,
    sonArea,
    myStudy,
    myStudyCourse,
    deleteStudyCourse
}