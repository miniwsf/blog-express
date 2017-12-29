/*删除文章*/
function deleteArticleType(articleId){
    Confirm.show("您确定删除吗?",deleteArticleTypeById,articleId);
}

/*删除数据*/
function deleteArticleTypeById(articleId) {
    $.ajax({
        type:"DELETE",
        url:"/articleType",
        data:{
            "articleTypeId":articleId
        },
        success:function(res){
            Tips.show("删除成功");
            window.location.reload();
        },
        error:function(err) {
            Tips.show("删除失败");
        }
    });
}