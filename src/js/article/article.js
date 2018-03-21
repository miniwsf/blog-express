import tips from "../../common/component/tips.vue";
import confirm from "../../common/component/confirm.vue";

(()=>{
    var vm=new Vue({
        el:"#article",
        data:{
            articleList:[],
            currentPage:0,
            limit:30,
            moreData:true,
            title:"",
            demoAdd:false
        },
        methods:{
            getData(page){
                let that=this;
                that.currentPage= page === undefined ? ++that.currentPage : page;

                $.ajax({
                    type:"post",
                    url:"/blog",
                    data:{
                        "page":that.currentPage,
                        "limit":that.limit,
                        "title":that.title
                    },
                    success:function(res){
                        if(that.currentPage==1){
                            that.articleList=[];
                        }

                        let articleLength=res.article.length >>> 0;

                        if(articleLength>0){
                            that.articleList.push(...res.article);
                            that.moreData=articleLength<that.limit ? false : true;
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
            deleteArticle(id){
                let that=this;
                that.$refs.confirm.show({
                    title:"删除文章",
                    msg:"您确定要删除该条数据吗？",
                    callback:this.deleteArticleById,
                    params:id
                });
            },
            deleteArticleById(id){
                let that=this;
                $.ajax({
                    type:"DELETE",
                    url:"/article",
                    data:{
                        "articleId":id
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
            /* get the detail of blog */
            getBlogDetail(id){
                window.location.href="/blog/"+id;
            },
            editArticle(id){
                window.location.href="/article/articleAdd?articleId="+id;
            }
        },
        components:{
            tips,
            confirm
        },
        mounted(){
            let that=this;
            that.getData();
        }
    });
})();
