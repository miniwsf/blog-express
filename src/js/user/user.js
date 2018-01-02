var $form=$("#fileForm");

/*保存七牛上传图片配置*/
function saveInfo(){
    var nickName=$("#nickName").val();
    var avatar=$("#avatar")[0].src;
    var psd1=$("#psd1").val();
    var psd2=$("#psd2").val();
    if(!nickName){
        Tips.show("请填写用户昵称");
        return false;
    }
    if(!avatar){
        Tips.show("请上传用户头像");
        return false;
    }
    if(psd1!=psd2){
        Tips.show("两次密码输入不一致，请重新输入");
        return false;
    }
    var data={};
    data.nickName=nickName;
    data.avatar=avatar;
    data.id=$("#userId").val();
    if(psd1){
        data.password=psd1;
    }
    $.ajax({
        type:"POST",
        url:"/user",
        data:data,
        success:function(res){
            Tips.show("保存成功");
            window.location.reload();
        },
        error:function(err) {
            Tips.show("保存失败");
        }
    })
}

function editInfo(){
    $("#userInfo").css("display","none");
    $("#userInfoEdit").css("display","block");
}

var inputElement = document.getElementById("file");
inputElement.addEventListener("change", uploadAvatar, false);

function uploadAvatar() {
    var files = $("[name='file']")[0].files;
    if (files.length > 0) {
        uploadImg(files, files.length, 0);
    }
    else{
        Tips.show("请先上传头像!");
    }
}

function uploadImg(files, length, i){
    if (length > i) {
        var formdata = new FormData();
        formdata.append("file", files[i]);
        formdata.append("key", new Date().getTime() + ".jpg");
        //获取信息
        $.ajax({
            type:"get",
            url:"/file/token",
            success:function(res){
                formdata.append("token", res.uploadToken);
                $.ajax({
                    type: "POST",
                    url: "http://up-z1.qiniu.com/",
                    data: formdata,
                    dataType: "json",
                    contentType: false,
                    processData: false
                }).then(function (json) {
                    $("#avatar").attr("src","http://oxyg3rfge.bkt.clouddn.com/" + json.key)
                }, function (err) {
                    console.log(err)
                })
            },
            error:function(err) {
                console.log(err)
            }
        });
    } else {
        $("[name='file']").val("");
    }
}