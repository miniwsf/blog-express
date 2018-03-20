import tips from "../../common/component/tips.vue";
import confirm from "../../common/component/confirm.vue";
import dialogs from "../../common/component/dialog.vue";

(()=>{
    var vm=new Vue({
        el:"#articleType",
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
                let tipMsg = id === undefined ? "新增": "修改";
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
            tips,
            confirm,
            dialogs
        },
        mounted(){
            let that=this;
            that.getData();
        }
    });
})();
