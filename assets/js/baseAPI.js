// 每次调用ajax之前都会调用这个函数
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 设置  headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 设置 complete 
    options.complete = function (res) {
        // console.log('执行了complete 回调： ')
        // console.log(res);
        // responseJSON  拿到服务器响应回来的阿数据
        if (res.responseJSON.status === 1 && res.responseJSON.
            message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})