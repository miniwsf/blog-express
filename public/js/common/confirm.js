/* 确认 */
let Confirm={
    msg:"",
    callback:null,   //回调函数
    params:null,     //参数
    show:function (msg,callback,params) {
        this.msg=msg;
        this.callback=callback;
        this.params=params;
        $("#confirmMsg").text(msg);
        $('#myConfirmModal').modal('show');

        $("#ok").on("click",this.ok);
    },
    ok:function () {
        var that = Confirm;
        that.close();
        if(that.callback){
            that.callback(that.params);
        }
    },
    close:function () {
        $('#myConfirmModal').modal('hide');
    }
};
