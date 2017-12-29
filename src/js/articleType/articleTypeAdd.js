(function(){
    if(!tokenVal){
        window.location.href="/login";
        return false;
    }
    var $form=$("#articleTypeForm");
    $("#saveArticleType").bind("click",saveArticleType);

    function saveArticleType(){
        var form=$form[0];
        var type=form.typeName.value;
        if(!checkData()){
            return;
        }
        $.ajax({
            type:"POST",
            url:"/articleType",
            data:{
                "type":type
            },
            headers: {
                "x-access-token": tokenVal
            },
            success:function(res){
                $("#articleTypeModel").modal("hide");
                Tips.show("新增成功");
                window.location.reload();
            },
            error:function(err) {
                Tips.show("新增失败，请稍后重试");
            }
        });
    }

    //检查数据
    function checkData(){
        var form=$("#articleTypeForm")[0];
        var type=form.typeName.value;
        if(!type){
            Confirm.show("文章类别不可为空");
            return false;
        }
        return true;
    }
})();
