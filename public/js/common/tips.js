/* 提示消息 */
var Tips={
    msg:"",
    show:function (msg) {
        var that=this;
        $("#tipsMsg").text(msg);
        $("#myAlert").fadeIn("slow");
        setTimeout(function(){
            that.close();
        },2000);
    },
    close:function () {
        $("#myAlert").fadeOut("slow");
    }
};
