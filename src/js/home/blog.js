(function (){
    var currentPage=0;
    var lastScrollY=document.body.scrollTop;
    var TIME=100;
    //vm.getBlogData();

    setInterval(handleScroll, TIME);

    let handleScroll=()=>{
        var scroll= document.body.scrollTop;
        if (lastScrollY >=scroll) {
            return;
        }
        else {
            lastScrollY = scroll;
        }
        if (lastScrollY + innerHeight + 200 > document.body.offsetHeight) {
            vm.getBlogData();
        }
    };

    var vm=new Vue({
        el:"#blog",
        data:{
            blogList:null,
            typeList:null,
            currentPage:0,
            typeId:0
        },
        methods:{
            /*slide to top*/
            slideTop(){
                $("html,body").animate({scrollTop: "0px"}, 800);
            },
            /*get date of blog's articles*/
            getBlogData(typeId){
                let that=this;
                that.currentPage+=1;
                if(typeId){
                    currentPage=0;
                    lastScrollY=0;
                }
                $.ajax({
                    type:"post",
                    url:"/blog",
                    data:{
                        "page":currentPage,
                        "typeId":!typeId?"":typeId
                    },
                    success:function(res){
                        that.blogList=res.article;
                    },
                    error:function(err) {

                    }
                });
            }
        },
        mounted(){
            this.getBlogData();
        }
    });
})();