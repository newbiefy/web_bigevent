$(function () {
    getUserInfo()
    // 点击退出问题
    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        layer.confirm('你确定要退出吗？', { icon: 3, title: '提示' },
            function (index) {
                // 清除本地储存的 token
                localStorage.removeItem('token')
                // 跳转到登录页面
                location.href = '/login.html'

                layer.close(index)
            })
    })
})


function getUserInfo () {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     // console.log('执行了complete 回调： ')
        //     // console.log(res);
        //     // responseJSON  拿到服务器响应回来的阿数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.
        //         message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// renderAvatar  方法
function renderAvatar (user) {
    //获取名称
    var name = user.nickname || user.username
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染用户头像
    if (user.user_pic != null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        // 获取第一个字符 转换为大写
        var first = name[0].toUpperCase()
        // 把转换的第一个大写字符作为头像
        $('.text-avatar').html(first).show()
    }
}

