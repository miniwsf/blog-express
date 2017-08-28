(function(){
   var $form=$("#articleTypeForm");
     $("#saveArticleType").bind("click",saveArticleType);

     function saveArticleType(){
       var form=$form[0];
       var type=form.typeName.value;

        $.ajax({
          type:"POST",
          url:"/articleType/articleTypeAddOk",
          data:{
            "type":type
          },
          success:function(res){
            window.location.href="/articleType";
            $('#articleTypeModel').modal("hidden");
          },
          error:function(err) {
              //console.log(err)
          }
        })
     }

     //检查数据
     function checkData(){
       var form=$("#acticleForm");
       var title=form.title;
       var type=form.type;
       var keyword=form.keyword;
       var content=form.content;
       if(!title){

       }
     }
})()
