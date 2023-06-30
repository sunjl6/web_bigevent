$(function () {

    $('#link-log').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link-reg').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    let form = layui.form

    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function () {
            let pwd = $('.reg-box [name=password]').val()
            let repwd = $('.reg-box [name=repassword]').val()
            if (pwd !== repwd) {
                return '2次密码输入不正确'
            }

        }
    })


    // 发起 请求，由于没有真后台 这里返回值 用假数据
    // let result = {
    //     "status": 0,
    //     "message": "注册成功"
    // }


    $('#form_reg').on('submit', function (e) {
        var username = $('#form_reg [name=username]').val()
        var pwd = $('#form_reg [name=password]').val()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
          }
        e.preventDefault()

        $.post('/api/reg',data,function(res){
          
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            
            layer.msg(res.message)
            $('#link-reg').click()
        })
    })

    $('#form_log').on('submit',function(e){
        var username = $('#form_log [name=username]').val()
        var pwd = $('#form_log [name=password]').val()
       
        var data = {
            username: $('#form_log [name=username]').val(),
            password: $('#form_log [name=password]').val()
          }
          e.preventDefault()
          $.post('/api/login',data,function(res){
                if(res.status!== 0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                location.href = '/index.html'
                localStorage.setItem('token',res.token)
               
          })

    })

})


