$.ajaxPrefilter(function(options){
    options.url = 'http://localhost:8081' + options.url

    options.headers = {
        Authorization: localStorage.getItem('token') || ''
    }

    options.complete = function(res){
        
            let status = res.responseJSON.status  
            let msg = res.responseJSON.msg 

            if(status !== 0){
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        
    }
})