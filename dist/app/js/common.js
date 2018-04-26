/**
 * Created by wsf on 2018/4/23.
 */

let Common={
    shareInWX(param){
        let script=document.createElement("script");
        script.src="//res.wx.qq.com/open/js/jweixin-1.2.0.js";
        document.appendChild(script);

        /*配置分享参数*/
        let shareParame=null;
        if(param){
            shareParame={
                title: param.title||"Sunshine wsf", // 分享标题
                desc: param.desc||"每个人都有属于自己的一片森林，迷失的人迷失了，相逢的人会再相逢......", // 分享描述
                link: param.link||"", // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: param.img||"", // 分享图标
                type:"link" , // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    if(typeof param.success === "function"){
                        param.success.call(this);
                    }
                },
                cancel: function () {
                    if(typeof param.cancel === "function"){
                        param.cancel.call(this);
                    }
                }
            };
        }

        const url_bjtest="";
        /*获取权限验证参数*/
        var url = window.location.href;
        $.ajax({
            url: url_bjtest + "/wechat/get_signature",
            type: "post",
            data: { "url" : url },
            dataType: "json",
            success: function (data) {
                /*权限验证配置*/
                wx.config({
                    appId: data.data.appId,
                    timestamp: data.data.timestamp,
                    nonceStr: data.data.nonceStr,
                    signature: data.data.signature,
                    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone"]
                });
            }
        });

        wx.ready(function(){
            wx.onMenuShareTimeline(shareParame);
            wx.onMenuShareAppMessage(shareParame);
            wx.onMenuShareQQ(shareParame);
            wx.onMenuShareQZone(shareParame);
        });
    }
};
export default Common;