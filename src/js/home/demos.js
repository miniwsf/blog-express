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
            demoList:[],
            currentPage:0,
            limit:10,
            lastScrollY:document.body.scrollTop
        },
        methods:{
            /* slide to top */
            slideTop(){
                $("html,body").animate({scrollTop: "0px"}, 800);
            },
            /* get date of blog's articles */
            getBlogData(){
                let that=this;
                that.currentPage+=1;
                $.ajax({
                    type:"post",
                    url:"/demo/demoData",
                    data:{
                        "page":that.currentPage,
                        "limit":that.limit
                    },
                    success:function(res){
                        if(that.currentPage==1){
                            that.demoList=res.demo;
                        }
                        else{
                            that.demoList.push(...res.demo);
                        }
                    },
                    error:function(err) {

                    }
                });
            },
            getUrl(url){
                window.location.href=url;
            }
        },
        mounted(){
            this.getBlogData();
        }
    });
})();