/*删除文章*/
function deleteArticle(articleId){
    Confirm.show("您确定删除吗?",deleteArticleById,articleId);
}

function deleteArticleById(articleId) {
    $.ajax({
        type:"POST",
        url:"/article/deleteArticle",
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
    })
}