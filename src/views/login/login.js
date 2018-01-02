//require("./login.scss")
(function(){
    let vm=new Vue({
        el:"#login-main",
        data:{
            userName:"",
            passWard:""
        },
        methods:{
            login(){
                let that=this;
                if(!that.userName||!that.passWard){
                    /*Tips.show("请输入用户名");*/
                    console.log("非空");
                    return;
                }
                $.ajax({
                    type:"POST",
                    url:"/login",
                    data:{
                        "username":that.userName,
                        "password":that.passWard
                    },
                    success:function(res){
                        if(res.code==0){
                            /*本地存储token*/
                            window.localStorage.setItem("token",res.token);
                            window.location.href="/article";
                        }
                        else{
                            /*Tips.show(res.msg);*/
                        }
                    },
                    error:function(err) {
                        /*Tips.show(err);*/
                    }
                });
            }
        },
        component:{

        },
        mounted(){
        }
    });
})();