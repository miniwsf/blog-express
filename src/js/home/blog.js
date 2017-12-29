
var currentPage=1;
var lastScrollY=document.body.scrollTop;
var typeId=0;
var TIME=100;

/*
(function(){
    setInterval(handleScroll, TIME);
})();
*/

/*监测滚动*/
function handleScroll () { // 如果时间间隔内，没有发生滚动，且并未强制触发加载，则do nothing，再次间隔100毫秒之后
    var scroll= document.body.scrollTop;
    if (lastScrollY >=scroll) {
        return;
    }
    else {
        lastScrollY = scroll;
    }
    if (lastScrollY + innerHeight + 200 > document.body.offsetHeight) {
        getBlogData();
    }
}

/*获取更多数据*/
function getBlogData(){
    currentPage+=1;
    $.ajax({
        type:"post",
        url:"/blog",
        data:{
            "page":currentPage,
            "typeId":typeId==0?"":typeId
        },
        success:function(res){
            appendData(res.article);
        },
        error:function(err) {

        }
    });
}

/*追加数据*/
function appendData(data) {
    var source="\{{#each this}}\<div class='blog-article'>"+
        "<div class='blog-detail'>"+
        "<div class='blog-type'>\{{type.typeName}}\&nbsp;&nbsp;&nbsp;\{{create_time}}\</div>"+
        "<div class='blog-detail-title'>\{{title}}\</div>"+
        "<div class=blog-detail-image><img src='\{{image}}\'></div>"+
        "<div class='blog-detail-text'><div class='blog-detail-txt'>\{{{txt}}}\</div>"+
        "<div><a href='/blogDetail?articleId={{_id}}'>Read More...</a></div>"+
        "</div>"+
        "</div>"+
        "<div class='blog-author'>"+
        "<div class='blog-author-text'>Author</div>"+
        "<div class='blog-author-avatar'><img src='\{{author.avatar}}\?imageView2/1/w/200/h/200'></div>"+
        "<div class='blog-author-name'>{{author.nickName}}</div>"+
        "<div class='blog-read' title='阅读量'>" +
        "<span class='icon iconfont icon-yiyuedu blog-read-font'></span><span>&nbsp;&nbsp;\{{readAmount}}\</span></div>"+
        "<div class='blog-read' title='点赞量'>" +
        "<span class='icon iconfont icon-dianzan blog-admire-font'></span>&nbsp;&nbsp;\{{praiseNumber}}\</div>"+
        "</div>"+
        "</div>\{{/each}}";
    var myTemplate = Handlebars.compile(source);
    $("#tableList").append(myTemplate(data));
}

function getTypeId(id) {
    typeId=id;
    currentPage=0;
    $("#tableList").html("");
    lastScrollY=0;
    getBlogData();
}

function slideTop() {
    $("html,body").animate({scrollTop: "0px"}, 800);
}


(()={
    let vm=new Vue({
        el:"#blog-components",
        
    })
})()

