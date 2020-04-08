const init = {
    path: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
    },
    url: {
        login: '/api/app/login',
        getBanner: '/api/app/banner?',
        appIndex: '/api/app/recommend/appIndex?',
        courseClassify: '/api/app/courseClassify',
        courseBasis: '/api/app/courseBasis',
        courseInfo: '/api/app/courseInfo/basis_id=',
        otoCourseOptions: '/api/app/otoCourseOptions?',
        otoCourse: '/api/app/otoCourse?',
        getTeacher: '/api/app/teacher/',
        getTeacherInfo: '/api/app/teacher/info/',
        invite: '/api/app/teacher/invite',
        collect: 'api/app/teacher/collect/',
        mainCourse: '/api/app/teacher/mainCourse',
        collectKe: '/api/app/collect',
        cancel_collectKe: '/api/app/collect/cancel/',
        getUCenterInfo: '/api/app/getUCenterInfo?',
        coinRank: '/api/app/coin/coinRank?',
        pay: '/api/app/pay',
        feedback: '/api/app/feedback',
        userInfo: '/api/app/userInfo?',
        grade: '/api/app/vip/grade?',
        downOrder: '/api/app/order/downOrder',
    }
}

export default init