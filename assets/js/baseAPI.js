$.ajaxPrefilter(function(options){
    options.url = 'http://localhost:8081' + options.url

    options.headers = {
        Authorization: localStorage.getItem('token') || ''
    }

    options.complete = function(res){
            
            let status = res.responseJSON.status
           

            if(status ===1 && res.responseJSON.message === '身份认证失败！'){
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        
    }
}) 