$(function () {
    initArtCateList()

    let layer = layui.layer
    let form = layui.form
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/article/cate',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }


    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1, // page 层类型
            area: ['550px', '250px'],
            title: '添加分类',
            shade: 0.6, // 遮罩透明度
            shadeClose: true, // 点击遮罩区域，关闭弹层
            maxmin: true, // 允许全屏最小化
            anim: 0, // 0-6 的动画形式，-1 不开启
            content: $('#dialog-add').html()
        });
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg(res.message)
                layer.close(indexAdd)

            }
        })
    })

    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function (e) {
        indexEdit = layer.open({
            type: 1, // page 层类型
            area: ['550px', '250px'],
            title: '修改分类',
            shade: 0.6, // 遮罩透明度
            shadeClose: true, // 点击遮罩区域，关闭弹层
            maxmin: true, // 允许全屏最小化
            anim: 0, // 0-6 的动画形式，-1 不开启
            content: $('#dialog-edit').html()
        });

        let id = $(this).attr('data-id')

        $.ajax({
            method: 'GET',
            url: "/article/cates/" + id,
            success: function (result) {
                console.log(result)
                form.val('form-edit', result.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: "/article/updatecate",
            data: $(this).serialize(),
            success: function (result) {
                if (result.status !== 0) {
                    return layer.msg(result.message)
                }
                layer.msg(result.message)
                layer.close(indexEdit)
                initArtCateList()
            }
        })

    })


    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/article/deletecate/' + id,
                success: function (result) {
                    if (result.status !== 0) {
                        return layer.msg(result.message)
                    }

                    layer.msg(result.message)
                    layer.close(index)
                    initArtCateList()


                }
            })


        })



    })

})