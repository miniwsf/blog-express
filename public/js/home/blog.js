
var currentPage=1;
var lastScrollY=window.scrollY;

(function(){
    setInterval(handleScroll, 100);
})();

/*监测滚动*/
function handleScroll () { // 如果时间间隔内，没有发生滚动，且并未强制触发加载，则do nothing，再次间隔100毫秒之后
    var scroll= document.body.scrollTop;
    if (lastScrollY >=scroll) {
        return;
    }
    else {
        lastScrollY = scroll;
    }
    scrollY =scroll;
    innerHeight = window.innerHeight;        // 浏览器视口高度，包括滚动条
    if (lastScrollY + innerHeight + 200 > document.body.offsetHeight) {
        getBlogData();
    }
}

/*获取更多数据*/
function getBlogData(){
    currentPage+=1;
    $.ajax({
        type:"post",
        url:"/blogMore",
        data:{
            "page":currentPage
        },
        success:function(res){
            appendData(res.article);
        },
        error:function(err) {
            Tips.show("数据拉取失败，请稍后重试");
        }
    })
}

/*追加数据*/
function appendData(data) {
    var source="\{{#each this}}\<div class='blog-article'>"+
        "<div class='blog-detail'>"+
        "<div class='blog-type'>\{{type.typeName}}\&nbsp;&nbsp;&nbsp;\{{create_time}}\</div>"+
        "<div class='blog-detail-title'>\{{title}}\</div>"+
        "<div class=blog-detail-image><img src=''\{{image}}\'></div>"+
        "<div class='blog-detail-text'><div class='blog-detail-txt'>\{{{txt}}}\</div>"+
        "<div><a href='/blogDetail?articleId={{_id}}'>Read More...</a></div>"+
        "</div>"+
        "</div>"+
        "<div class='blog-author'>"+
        "<div class='blog-author-text'>Author</div>"+
        "<div class='blog-author-name'>{{author}}</div>"+
        "<div class='blog-read' title='阅读量'><img src='/images/Xmas_C-01.png' class='blog-icon'>{{readAmount}}</div>"+
        "<div class='blog-read' title='点赞量'><img src='/images/Xmas_C-03.png' class='blog-icon'>{{praiseNumber}}</div>"+
        "</div>"+
        "</div>\{{/each}}";
    var myTemplate = Handlebars.compile(source);
    $('#tableList').append(myTemplate(data));
}
