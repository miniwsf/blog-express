(function(){
  var articleEditormd;
  $.get('example.md', function(md){
     articleEditormd = editormd("articleEditormd", {
             width: "100%",
             height: 540,
             path : '/plugins/editor/lib/',
             theme : "white",
             previewTheme : "white",
             editorTheme : "white",
             markdown : md,
             codeFold : true,
             saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
             searchReplace : true,
             htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
             emoji : true,
             taskList : true,
             tocm: true,         // Using [TOCM]
             tex: true,                   // 开启科学公式TeX语言支持，默认关闭
             flowChart : true,             // 开启流程图支持，默认关闭
             sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
             imageUpload : true,
             imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
             imageUploadURL : "",
             onload : function() {
                 //console.log('onload', this);
             }
         });
     });

     var $form=$("#acticleForm");
     //$form.on('submit',saveArticle);
     $("#saveArticle").bind("click",saveArticle);

     function saveArticle(){
       var form=$form[0];
       var title=form.title.value;
       var type=form.type.value;
       var keyword=form.keywords.value;
       var content=articleEditormd.getMarkdown();
        $.ajax({
          type:"POST",
          url:"/article/articleAddOk",
          data:{
            "title":title,
            "type":type,
            "keywords":keyword,
            "content":content
          },
          success:function(res){
            window.location.href="/article";
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
