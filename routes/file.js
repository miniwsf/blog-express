//在顶部代码中加入如下代码
var formidable = require('formidable');
var fs = require('fs');
var express = require('express');
var router = express.Router();
const AVATAR_UPLOAD_FOLDER="/upload/";

//上传图片
router.post('/', function(req, res, next){
    console.log("进来没");
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';      //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;  //设置上传目录
    form.keepExtensions = true;    //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {
        console.log("出错啦")
        if (err) {
            res.send({'avatar':'error'}); //发生错误后输出json内容为avatar:error
            return;
        }
        //设置允许上传的文件，这里我设置的是图片，你也可以直接设置成rar、zip、doc等
        var extName = '';  //后缀名
        switch (files.avatar.type) { //这里的avatar就是我们之前表单中input[type=file]的name值，别搞错了
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        //如果没有查找到.jpg、.png的后缀名，则提示错误信息
        if(extName.length == 0){
            res.send({'avatar':'不支持的类型'});
            return;
        }
        //重新修改文件名字，使用随机数作为图片名字
        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;

        fs.renameSync(files.fulAvatar.path, newPath);  //重命名
        //返回json，json内容为图片相对路径
        //res.locals.success = '上传成功';
        res.send({'avatar':newPath});
    });
});

module.exports = router;