var $form=$("#fileForm");

/*保存七牛上传图片配置*/
function saveFile(){
    if(!checkData()){
        return false;
    }
    var form=$form[0];
    var accessKey=form.accessKey.value;
    var secretKey=form.secretKey.value;
    var scope=form.scope.value;
    var deadline=form.deadline.value;

    $.ajax({
        type:"POST",
        url:"/file/saveFile",
        data:{
            "accessKey":accessKey,
            "secretKey":secretKey,
            "scope":scope,
            "deadline":deadline
        },
        success:function(res){
            Tips.show("新增成功");
            window.location.href="/article";
        },
        error:function(err) {
            Tips.show("新增失败");
        }
    })
}

//检查数据
function checkData(){
    var form=$form[0];
    var accessKey=form.accessKey.value;
    var secretKey=form.secretKey.value;
    var scope=form.scope.value;
    var deadline=form.deadline.value;

    if(!accessKey){
        Confirm.show("请填写您七牛账户的AccessKey");
        return false;
    }
    else if(!secretKey){
        Confirm.show("请填写您七牛账户的SecretKey");
        return false;
    }
    else if(!scope){
        Confirm.show("请填写Scope,上传的目标空间名");
        return false;
    }
    else if(!deadline){
        Confirm.show("请填写token有效时间");
        return false;
    }
    return true;
}