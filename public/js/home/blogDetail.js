/*赞赏*/
function praiseData(id){
    $.ajax({
        type:"PUT",
        url:"/blog/"+id,
        data:{

        },
        success:function(res){
            window.location.reload();
        },
        error:function(err) {

        }
    });
}