function login(){
    var username=$("#username").val();
    var password=$("#password").val();
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
        url:"/login",
        data:{
            "username":username,
            "password":password
        },
        success:function(res){
            if(res.code==0){
                /*本地存储token*/
                window.localStorage.setItem("token",res.token);
                window.location.href="/article";
            }
            else{
                Tips.show(res.msg);
            }
        },
        error:function(err) {
            Tips.show(err);
        }
    });
}