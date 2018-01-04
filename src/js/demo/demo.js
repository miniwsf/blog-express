
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
                    error:function(err) {

                    }
                });
            },
            deleteDemo(id){
                let that=this;
                $.ajax({
                    type:"DELETE",
                    url:"/demo",
                    data:{
                        "demoId":id
                    },
                    success:function(res){
                        if(res.code==0){
                            that.getData();
                        }
                    },
                    error:function(err) {

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
        mounted(){
            let that=this;
            that.getData();
        }
    });
})();
