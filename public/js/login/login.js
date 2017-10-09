var $form=$("#form");

function login(){
    var form=$form[0];
    var username=form.username.value;
    var password=form.password.value;
    if(!username){
        Tips.show("请输入用户名");
        return;
    }
    if(!password){
        Tips.show("请输入密码");
        return;
    }
    $.ajax({
        type:"POST",
        url:"/login/loginCheck",
        data:{
            "username":username,
            "password":password
        },
        success:function(res){
            if(res.code==0){
                window.location.href="/article";
            }
            else{
                Tips.show(res.msg);
            }
        },
        error:function(err) {
            Tips.show(err);
        }
    })
}