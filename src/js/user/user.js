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


import Tips from "../../common/component/tips.vue";
import confirm from "../../common/component/confirm.vue";
import dialogs from "../../common/component/dialog.vue";

(()=>{
    var vm=new Vue({
        el:"#user",
        data:{
            typeList:[],
            demoData:{
                titleAdd:"",
                descriptionAdd:"",
                demoLinkAdd:"",
                demoImagesAdd:"",
                codeUrlAdd:""
            },
            demoAdd:false,
            dialogData:{
                dialogForm:[{
                    title:"类别名称",
                    cols:1,
                    holder:"请输入类别名称",
                    required:true,
                    val:"",
                    field:"type"
                }]
            }
        },
        methods:{
            getData(){
                let that=this;
                $.ajax({
                    type:"get",
                    url:"/articleType/typeData",
                    data:{
                    },
                    success:function(res){
                        if(res.type.length>0){
                            that.typeList=res.type;
                        }
                    },
                    error:function() {
                        that.$refs.tips.show("查询数据失败，请稍后重试");
                    }
                });
            },
            deleteArticleType(id){
                let that=this;
                that.$refs.confirm.show({
                    title:"删除类别",
                    msg:"您确定要删除该条数据吗？",
                    callback:this.deleteArticleTypeById,
                    params:id
                });
            },
            deleteArticleTypeById(articleId) {
                let that=this;
                $.ajax({
                    type:"DELETE",
                    url:"/articleType",
                    data:{
                        "articleTypeId":articleId
                    },
                    success:function(res){
                        if(res.code==0){
                            that.$refs.tips.show("删除成功~");
                            that.getData(1);
                        }
                        else{
                            that.$refs.tips.show("删除失败，请稍后重试~");
                        }
                    },
                    error:function() {
                        that.$refs.tips.show("请求出错啦，请稍后重试~");
                    }
                });
            },
            addDemo(item){
                let that=this;
                if(item===undefined){  /*新增*/
                    that.$refs.dialogs.show({
                        dialogTitle:"新增类别",
                        dialogForm:that.dialogData.dialogForm,
                        callEvent:that.addDemoData
                    });
                }
                else{   /*编辑*/
                    let form=that.dialogData.dialogForm;
                    for(let data of form){
                        let field=data.field;
                        switch (field){case "type":data.val=item.typeName;break;}
                    }
                    that.$refs.dialogs.show({
                        dialogTitle:"编辑演示",
                        dialogForm:form,
                        callEvent:that.addDemoData,
                        params:item._id
                    });
                }
            },
            addDemoData(params,id){
                let that=this;
                params.demoId=id||"";
                let tipMsg="修改";
                if(id===undefined){
                    tipMsg="新增";
                }
                $.ajax({
                    type:"POST",
                    url:"/articleType",
                    data:params||{},
                    success:function(res){
                        if(res.code==0){
                            that.$refs.tips.show(tipMsg+"成功~");
                            that.$refs.dialogs.close();
                            that.getData();
                        }
                        else{
                            that.$refs.tips.show(tipMsg+"失败，请稍后重试~");
                        }
                    },
                    error:function() {
                        that.$refs.tips.show("请求出错啦，请稍后重试~");
                    }
                });
            }
        },
        components:{
            tips:Tips,
            confirm
        },
        mounted(){
            let that=this;
            that.getData();
        }
    });
})();
