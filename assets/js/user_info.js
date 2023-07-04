
var form = layui.form

$(function () {


  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })

  initUserInfo()

  $('#btnReset').on('click', function (e) {
    // e.preventDefault()
    console.log('重置表单了')
    initUserInfo();
  })


  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: "/updateUser",
      data: $(this).serialize(),
      success: function (result) {
        if (result.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo()
      }
    })
  })



})


function initUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/userInfo',
    // headers: {
    //     Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      var data = res.data[0]
      form.val('formUserInfo', data)
      // $('#username').val(data.username)
      // $('#nickname').val(data.nickname)
      // $('#email').val(data.email)

    },

  })

}
