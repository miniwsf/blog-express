var currentPage=1;

/*删除文章*/
function deleteArticle(articleId){
    Confirm.show("您确定删除吗?",deleteArticleById,articleId);
}

/*删除数据*/
function deleteArticleById(articleId) {
    $.ajax({
        type:"DELETE",
        url:"/article",
        data:{
            "articleId":articleId
        },
        success:function(res){
            window.location.reload();
            Tips.show("删除成功");
        },
        error:function(err) {
            Tips.show("删除失败");
        }
    });
}

/*获取更多数据*/
function getBlogData(){
    if(!tokenVal){
        window.location.href="/login";
        return false;
    }
    currentPage+=1;
    $.ajax({
        type:"post",
        url:"/blogMore",
        data:{
            "page":currentPage,
        },
        headers: {
            "x-access-token": tokenVal
        },
        success:function(res){
            if(res.article.length>0){
                appendData(res.article);
            }
            else{
                $("#noData").css("display","block");
                $("#moreData").css("display","none");
            }
        },
        error:function(err) {

        }
    })
}

/*追加数据*/
function appendData(data) {
    var source="\{{#each this}}\<tr> <td>#</td> <td>\{{title}}\</td> <td>\{{type.typeName}}\</td> <td>\{{keywords}}\</td> <td>\{{author.nickName}}\</td> <td>\{{create_time}}\</td> <td>\{{readAmount}}\</td>"+
    "<td>\{{praiseNumber}}\</td> <td> <a type='button' class='btn btn-primary' href='/blogDetail?articleId={{_id}}'>查看详情</a>"+
        "<a type='button' class='btn btn-primary' href='/article/articleAdd?articleId={{_id}}'>编辑</a>"+
        "<a type='button' class='btn btn-danger' onclick=\"deleteArticle('{{_id}}')\">删除</a> </td> </tr>\{{/each}}";
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
