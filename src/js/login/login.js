import tips from "../common/component/tips.html";

(()=>{
    let vm=new Vue({
        el:"#login",
        data:{
            username:null,
            password:null,
            msg:"测试测试"
        },
        methods:{
            login(){
                let that=this;
                let username=that.username;
                let password=that.password;

                if(!username){
                    //Tips.show("请输入用户名");
                    return;
                }
                if(!password){
                    //Tips.show("请输入密码");
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
                            window.location.href="/article";
                        }
                        else{
                            //Tips.show(res.msg);
                        }
                    },
                    error:function(err) {
                        //Tips.show(err);
                    }
                });
            }
        },
        components:{
            tips
        },
        mounted(){

        }
    });
})();