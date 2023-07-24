$(function () {

    let layer = layui.layer

    let form = layui.form

    let laypage = layui.laypage;

    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: "", // 文章分类的 Id
        state: "" // 文章的发布状态
    }
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    initTable()
    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/article/cate',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()

            }
        })
    }


    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/article/pageList',
            data: q,
            success: function (result) {
                if (result.status !== 0) {
                    layer.msg(result.message)
                }
                var htmlStr = template('tpl-table', result)
                $('tbody').html(htmlStr)

                renderPage(result.total);
            }
        })

    }


    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                console.log(obj.curr)
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    $('tbody').on('click', '.btn-delete', function (event) {
        let id = $(this).attr('data-id')
        let len = $('.btn-delete').length
        layer.confirm('确定是否删除这条记录', {
            btn: ['确定', '关闭'] //按钮
        }, function () {
            $.ajax({
                method: 'GET',
                url: '/article/delete/'+id,
                success: function (result) {
                    if(result.state !== 0){
                        layer.msg(result.message,{icon: 1})
                    }

                    layer.msg(result.message, { icon: 1 });

                    if(len === 1){
                        q.pagenum = q.pagenum ===1 ? 1 : q.pagenum -1 
                    }
                    
                    initTable()
                }
            })

        },);


    })


})