import Tips from "../common/component/tips.vue";
import confirm from "../common/component/confirm.vue";
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
            demoAdd:false
        },
        methods:{
            getData(){
                let that=this;
                that.currentPage+=1;

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
                    callback:this.methods.deleteDemoById,
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
                            that.getData();
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
            addDemo(){
                let that=this;
                that.demoAdd=true;
            },
            addDemoData(){

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
