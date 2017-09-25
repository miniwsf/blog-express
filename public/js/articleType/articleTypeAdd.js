(function(){
   var $form=$("#articleTypeForm");
     $("#saveArticleType").bind("click",saveArticleType);

     function saveArticleType(){
       var form=$form[0];
       var type=form.typeName.value;
      if(!checkData()){
        return;
      }
        $.ajax({
          type:"POST",
          url:"/articleType/articleTypeAddOk",
          data:{
            "type":type
          },
          success:function(res){
            Tips.show("新增成功");
            //window.location.href="/articleType";
          },
          error:function(err) {
            Tips.show("新增失败，请稍后重试");
          }
        })
     }

     //检查数据
     function checkData(){
       var form=$("#articleTypeForm")[0];
       var type=form.typeName.value;
       if(!type){
        alert("文章类别不可为空");
        return false;
       }
       return true;
     }
})()
