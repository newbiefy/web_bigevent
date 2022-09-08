$(function () {
    //点击去注册的链接 
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui 中获取 form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify() 函数自定义效验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],

        //效验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        //阻止表单默认提交
        e.preventDefault()
        //发起一个ajax请求
        var data = {
            username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功！');
            //模拟点击登录事件
            $('#link_login').click()
        })
    })


    //监听登录表单提交
    $('#form_login').submit(function (e) {
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                //将登录成功的token字符串 保存到localstorage中
                localStorage.setItem('token', res.token)
                //跳转后台
                location.href = '/index.html'
            }
        })
    })
})