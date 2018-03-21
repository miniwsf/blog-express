(function (){
    var vm=new Vue({
        el:"#home",
        data:{
            articleLatest:null,
            recommendArticle:null,
            currentPage:1
        },
        methods:{
            /* get date of blog's articles */
            getBlogData(){
                let that=this;
                $.ajax({
                    type:"post",
                    url:"/blog",
                    data:{
                        "page":that.currentPage,
                        "limit":4,
                        "typeId":""
                    },
                    success:function(res){
                        let [recommendArticle ,...articleLatest]=res.article;
                        that.recommendArticle=recommendArticle;
                        that.articleLatest=Array.prototype.splice.call(articleLatest,0,3);
                    },
                    error:function(err) {

                    }
                });
            },
            /* get the detail of blog */
            getBlogDetail(id){
                window.location.href="/blog/"+id;
            }
        },
        mounted(){
            this.getBlogData();
        }
    });
})();