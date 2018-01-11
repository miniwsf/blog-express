(function (){
    const TIME=100;
    setInterval(handleScroll, TIME);

    let handleScroll=()=>{
        let scroll= document.body.scrollTop;
        if (vm.lastScrollY >=scroll) {
            return;
        }
        else {
            vm.lastScrollY = scroll;
        }
        if (vm.lastScrollY + innerHeight + 200 > document.body.offsetHeight) {
            vm.getBlogData();
        }
    };

    var vm=new Vue({
        el:"#blog",
        data:{
            blogList:[],
            typeList:null,
            currentPage:0,
            typeId:0,
            lastScrollY:document.body.scrollTop
        },
        methods:{
            /* slide to top */
            slideTop(){
                $("html,body").animate({scrollTop: "0px"}, 800);
            },
            /* get date of blog's articles */
            getBlogData(typeId){
                let that=this;
                that.currentPage+=1;
                if(!(typeId === undefined)){
                    that.currentPage=1;
                    vm.lastScrollY=0;
                }
                $.ajax({
                    type:"post",
                    url:"/blog",
                    data:{
                        "page":that.currentPage,
                        "typeId":!typeId?"":typeId
                    },
                    success:function(res){
                        if(that.currentPage==1){
                            that.blogList=res.article;
                        }
                        else{
                            that.blogList.push(...res.article);
                        }
                    },
                    error:function(err) {

                    }
                });
            },
            /* get the detail of blog */
            getBlogDetail(id){
                window.location.href="/blog/"+id;
            },
            /* Get the blog category */
            getType(){
                let that=this;
                $.ajax({
                    type:"get",
                    url:"/articleType/typeData",
                    data:{

                    },
                    success:function(res){
                        that.typeList=res.type;
                    },
                    error:function(err) {

                    }
                });
            }
        },
        mounted(){
            this.getBlogData();
            this.getType();
        }
    });
})();