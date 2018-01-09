

var formData={
    titleAdd:"",
    typeAdd:"",
    keywordsAdd:"",
    articleId:"",
    contentAdd:"",
    contentHAdd:"",
    page:""
};

import Tips from "../../common/component/tips.vue";

(()=>{
    let articleEditormd;
    /*markdown编辑器*/
    $.get("../plugins/editor/example.md", function(md){
        articleEditormd = editormd("articleEditormd", {
            width: "100%",
            height: 540,
            path : "/plugins/editor/lib/",
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
            tex: true,                  // 开启科学公式TeX语言支持，默认关闭
            flowChart : true,            // 开启流程图支持，默认关闭
            sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
            imageUpload : true,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL : "",
            onload : function() {
                //console.log("onload", this);
            }
        });
    });

    var vm=new Vue({
        el:"#articleAdd",
        data:{

        },
        methods:{
            saveArticle(){
                let that=this;
                if(!that.checkData()){
                    return false;
                }
                $.ajax({
                    type:"POST",
                    url:"/article",
                    data:formData,
                    success:function(res){
                        if(res.code=="0"){
                            that.$refs.tips.show("新增成功~");
                            window.location.href="/article";
                        }
                        else{
                            that.$refs.tips.show("新增失败~");
                        }
                    },
                    error:function() {
                        that.$refs.tips.show("请求出错，请稍后重试~");
                    }
                });
            },
            checkData(){
                let that=this;
                formData={
                    titleAdd:$("#title").val(),
                    typeAdd:$("#disabledSelect option:selected").val(),
                    keywordsAdd:$("#keywords").val(),
                    articleId:$("#articleId").val(),
                    contentAdd:articleEditormd.getMarkdown(),
                    contentHAdd:articleEditormd.getHTML(),
                    page:""
                };
                if(!formData.titleAdd){
                    that.$refs.tips.show("请输入文章标题~");
                    return false;
                }
                else if(!formData.keywordsAdd){
                    that.$refs.tips.show("请输入文章关键字~");
                    return false;
                }
                else if(!formData.contentAdd){
                    that.$refs.tips.show("请输入文章内容~");
                    return false;
                }
                return true;
            }
        },
        components:{
            tips:Tips
        },
        mounted(){

        }
    });
})();