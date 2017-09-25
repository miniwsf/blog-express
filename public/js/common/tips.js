/* 提示消息 */
var Tips={
    msg:"",
    show:function (msg) {
        var that=this;
        $("#myAlert").removeClass("display-hidden").addClass("display-block");
        $("#tipsMsg").text(msg);
        setTimeout(function(){
            that.close();
        },3000);
    },
    close:function () {
        $("#myAlert").removeClass("display-block").addClass("display-hidden");
    }
};
