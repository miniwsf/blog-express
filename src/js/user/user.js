import Tips from "../../common/component/tips.vue";

(()=>{
    var vm=new Vue({
        el:"#user",
        data:{
            userName:null,
            nickName:null,
            avatar:null,
            psd1:null,
            psd2:null,
            id:null,
            isEdit:false
        },
        methods:{
            getData(){
                let that=this;
                $.ajax({
                    type:"get",
                    url:"/user/personal",
                    data:{
                    },
                    success:function(res){
                        if(res.code=="0"){
                            that.userName=res.user.userName;
                            that.nickName=res.user.nickName;
                            that.avatar=res.user.avatar;
                            that.id=res.user._id;
                        }
                    },
                    error:function() {
                        that.$refs.tips.show("查询数据失败，请稍后重试");
                    }
                });
            },
            uploadImg(files, length, i){
                let that=this;
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
                                that.avatar="http://oxyg3rfge.bkt.clouddn.com/" + json.key;
                            }, function (err) {
                            });
                        },
                        error:function(err) {

                        }
                    });
                } else {
                    $("[name='file']").val("");
                }
            },
            uploadAvatar() {
                let that=this;
                let files = $("[name='file']")[0].files;
                if (files.length > 0) {
                    that.uploadImg(files, files.length, 0);
                }
                else{
                    that.$refs.tips.show("请先上传头像!");
                }
            },
            saveInfo(){
                let that=this;
                if(!that.nickName){
                    that.$refs.tips.show("请填写用户昵称");
                    return false;
                }
                if(!that.avatar){
                    that.$refs.tips.show("请上传用户头像");
                    return false;
                }
                if(!that.psd1){
                    that.$refs.tips.show("请输入修改后的密码");
                    return false;
                }
                if(!that.psd2){
                    that.$refs.tips.show("请再次确认修改后的密码");
                    return false;
                }
                if(that.psd1!=that.psd2){
                    that.$refs.tips.show("两次密码输入不一致，请重新输入");
                    return false;
                }

                let data={
                    nickName:that.nickName,
                    avatar:that.avatar,
                    id:that.id,
                    password:that.psd1
                }
                $.ajax({
                    type:"POST",
                    url:"/user",
                    data:data,
                    success:function(res){
                        if(res.code==0){
                            that.$refs.tips.show("信息修改成功");
                        }
                        else{
                            that.$refs.tips.show("信息修改失败，请稍后重试");
                        }
                    },
                    error:function() {
                        that.$refs.tips.show("信息修改失败，请稍后重试");
                    }
                });
            },
            editInfo(){
                let that=this;
                that.isEdit=true;
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



