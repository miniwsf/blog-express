(function(){
   var $form=$("#acticleForm");
     //$form.on('submit',saveArticle);
     $("#saveArticle").bind("click",saveArticleType);

     function saveArticleType(){
       var form=$form[0];
       var title=form.title.value;
       var type=form.type.value;
       var keyword=form.keywords.value;
       var content=articleEditormd.getMarkdown();
        $.ajax({
          type:"POST",
          url:"/article/articleTypeAddOk",
          data:{
            "title":title,
            "type":type,
            "keywords":keyword,
            "content":content
          },
          success:function(res){
            window.location.href="/articleType";
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
