$(function() {
    var form = layui.form
  
    form.verify({
      pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
      samePwd: function(value) {
        if (value === $('[name=oldPwd]').val()) {
          return '新旧密码不能相同！'
        }
      },
      rePwd: function(value) {
        if (value !== $('[name=newPwd]').val()) {
          return '两次密码不一致！'
        }
      }
    })


    $('#updatePwd').on('submit',function(e){
      e.preventDefault()
      $.ajax({
        method: 'POST',
        url: "/updatePwd",
        data: $(this).serialize(),
        success: function (result) {
          if(result.status ===1){
            return layui.layer.msg(result.message)
          }
           layui.layer.msg(result.message)

           $('#updatePwd')[0].reset()
        }
      })


    })




  })