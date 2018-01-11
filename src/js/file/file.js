import Tips from "../../common/component/tips.vue";

(()=>{
    var vm=new Vue({
        el:"#file",
        data:{
            accessKey:null,
            secretKey:null,
            scope:null,
            deadline:null
        },
        methods:{
            getData(){
                let that=this;
                $.ajax({
                    type:"get",
                    url:"/file/file",
                    data:{
                    },
                    success:function(res){
                        if(res.code=="0"){
                            that.accessKey=res.data.accessKey;
                            that.secretKey=res.data.secretKey;
                            that.scope=res.data.scope;
                            that.deadline=res.data.deadline;
                        }
                    },
                    error:function() {
                        that.$refs.tips.show("查询数据失败，请稍后重试");
                    }
                });
            },
            saveFile(){
                let that=this;
                if(!that.checkData()){
                    return false;
                }
                $.ajax({
                    type:"POST",
                    url:"/file/saveFile",
                    data:{
                        "accessKey":that.accessKey,
                        "secretKey":that.secretKey,
                        "scope":that.scope,
                        "deadline":that.deadline
                    },
                    success:function(res){
                        if(res.code=="0"){
                            that.$refs.tips.show("修改成功");
                        }
                        else{
                            that.$refs.tips.show("修改失败，请稍后重试");
                        }
                    },
                    error:function() {
                        that.$refs.tips.show("修改失败，请稍后重试");
                    }
                });
            },
            checkData(){
                let that=this;
                if(!that.accessKey){
                    that.$refs.tips.show("请填写您七牛账户的AccessKey");
                    return false;
                }
                else if(!that.secretKey){
                    that.$refs.tips.show("请填写您七牛账户的SecretKey");
                    return false;
                }
                else if(!that.scope){
                    that.$refs.tips.show("请填写Scope,上传的目标空间名");
                    return false;
                }
                else if(!that.deadline){
                    that.$refs.tips.show("请填写token有效时间");
                    return false;
                }
                return true;
            }
        },
        components:{
            tips:Tips
        },
        mounted(){
            let that=this;
            that.getData();
        }
    });
})();