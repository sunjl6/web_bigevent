$.ajaxPrefilter(function(options){
    options.url = 'http://localhost:8081' + options.url
})