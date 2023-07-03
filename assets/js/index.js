$(function () {
    getUserInfo()
    $('#btnLogout').on('click',function(){
            layer.confirm('是否退出？', {
              btn: ['确定', '关闭'] //按钮
            }, function(){
              layer.msg('退出成功，跳转页面', {icon: 1});
              localStorage.removeItem('token')
              location.href = '/login.html'
            });  
    })
})

function getUserInfo() {
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
             renderAvatar(res.data[0])
        },
        // complete:function(res){
        //     let status = res.responseJSON.status  
        //     let msg = res.responseJSON.msg 

        //     if(status !== 0){
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }

    })

}





function renderAvatar(user) {
    let uNickname = user.nickname || user.username
    let uPic = user.user_pic
  
    $('#weclome').html('欢迎&nbsp;&nbsp;' + uNickname)

    if (uPic !== null) {
      
     
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', uPic)
            .show()
    } else {
      
        $('.layui-nav-img').hide()
        let first = uNickname[0].toUpperCase()
        $('.text-avatar').html(first).show
    }




}