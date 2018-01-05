import Tips from "../../common/component/tips.vue";
import confirm from "../../common/component/confirm.vue";
import dialogs from "../../common/component/dialog.vue";

(()=>{
    var vm=new Vue({
        el:"#demo",
        data:{
            demoList:[],
            currentPage:0,
            limit:10,
            moreData:true,
            title:"",
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
                    title:"演示标题",
                    cols:1,
                    holder:"请输入演示标题",
                    required:true,
                    val:"",
                    field:"titleAdd"
                },{
                    title:"源码地址",
                    cols:1,
                    holder:"请输入源码地址",
                    required:true,
                    val:"",
                    field:"codeUrlAdd"
                },{
                    title:"演示地址",
                    cols:1,
                    holder:"请输入演示地址",
                    required:true,
                    val:"",
                    field:"demoLinkAdd"
                },{
                    title:"描述",
                    cols:3,
                    holder:"请填写演示相关信息描述",
                    required:true,
                    val:"",
                    field:"descriptionAdd"
                }]
            }
        },
        methods:{
            getData(page){
                let that=this;
                if(page===undefined){
                    that.currentPage+=1;
                }
               else{
                    that.currentPage=page;
                }

                $.ajax({
                    type:"post",
                    url:"/demo/demoData",
                    data:{
                        "page":that.currentPage,
                        "limit":that.limit,
                        "title":that.title
                    },
                    success:function(res){
                        if(res.demo.length>0){
                            if(that.currentPage==1){
                                that.demoList=[];
                            }
                            that.demoList.push(...res.demo);
                            if(res.demo.length<that.limit){
                                that.moreData=false;
                            }
                            else{
                                that.moreData=true;
                            }
                        }
                        else{
                            that.moreData=false;
                        }
                    },
                    error:function() {
                        that.$refs.tips.show("请求出错啦，请稍后重试");
                    }
                });
            },
            deleteDemo(id){
                let that=this;
                that.$refs.confirm.show({
                    title:"删除演示",
                    msg:"您确定要删除该条数据吗？",
                    callback:this.deleteDemoById,
                    params:id
                });
            },
            deleteDemoById(id){
                let that=this;
                $.ajax({
                    type:"DELETE",
                    url:"/demo",
                    data:{
                        "demoId":id
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
                        dialogTitle:"新增演示",
                        dialogForm:that.dialogData.dialogForm,
                        callEvent:that.addDemoData
                    });
                }
                else{   /*编辑*/
                    let form=that.dialogData.dialogForm;
                    for(let data of form){
                        let field=data.field;
                        switch (field){
                        case "titleAdd":data.val=item.demoTitle;break;
                        case "codeUrlAdd":data.val=item.codeUrl;break;
                        case "demoLinkAdd":data.val=item.demoLink;break;
                        case "descriptionAdd":data.val=item.demoDescription;break;
                        }
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
                    type:"post",
                    url:"/demo",
                    data:params||{},
                    success:function(res){
                        if(res.code==0){
                            that.$refs.tips.show(tipMsg+"成功~");
                            that.$refs.dialogs.close();
                            that.getData(1);
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
            confirm,
            dialogs
        },
        mounted(){
            let that=this;
            that.getData();
        }
    });
})();
