import Tips from "../../common/component/tips.vue";

(()=>{
    let vm=new Vue({
        el:"#login",
        data:{
            username:null,
            password:null,
        },
        methods:{
            login(){
                let that=this;
                let username=that.username;
                let password=that.password;

                if(!username){
                    that.$refs.tips.show("请输入用户名");
                    return;
                }
                if(!password){
                    that.$refs.tips.show("请输入密码");
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
                            that.$refs.tips.show(res.message);
                        }
                    },
                    error:function() {
                        that.$refs.tips.show("请求出错啦，请稍后重试");
                    }
                });
            }
        },
        components:{
            tips:Tips
        },
        mounted(){

        }
    });
})();