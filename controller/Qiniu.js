"use strict";

import QiniuModel from "../models/Qiniu";
const qinius = require("qiniu");

class Qiniu {
    constructor(){
        this.getToken=this.getToken.bind(this);
        this.getData=this.getData.bind(this);
        this.getFile=this.getFile.bind(this);
        this.saveInfo=this.saveInfo.bind(this);
        this.saveFileInfo=this.saveFileInfo.bind(this);
    }

    /*获取数据*/
    getData(req, res, next){
        let id=req.body.id;
        let selectParam={
            scope:"blog"
        };
        if(id){
            selectParam._id=id;
        }
        return new Promise((resolve) => {
            QiniuModel.find(selectParam).exec(function (err, qiniu) {
                if (err) {
                    resolve(null,"1","查询失败");
                }
                else {
                    resolve(qiniu,"0","查询成功");
                }
            });
        });
    }
    /*获取数据*/
    getToken(req, res, next){
        this.getData(req, res, next).then(function (qiniu,code,msg) {
            let data=null;
            let uploadToken="";
            if(qiniu.length>0){
                data=qiniu[0];
                /*生成token*/
                let mac = new qinius.auth.digest.Mac(data.accessKey, data.secretKey);
                let putPolicy = new qinius.rs.PutPolicy({
                    scope: data.scope,
                });
                uploadToken = putPolicy.uploadToken(mac);
            }
            res.send({code,msg,uploadToken});
        });
    }
    /*渲染文件设置界面*/
    getFile(req, res, next){
        this.getData(req, res, next).then(function (qiniu,code,msg) {
            let data={};
            if(qiniu.length>0){
                data=qiniu[0];
            }
            let {accessKey=null,secretKey=null,scope=null,deadline=null}=data;
            res.render("file/file",{code,msg,accessKey,secretKey,scope,deadline});
        });
    }
    /*保存*/
    saveFileInfo(req, res, next){
        let that=this;
        that.getData(req, res, next).then(function(qiniu,code,msg) {
            if(!qiniu||qiniu.length==0){
                that.saveInfo(req, res, next);
            }
            else{
                that.updateInfo(req, res, next,qiniu[0]._id);
            }
            res.send("0","保存成功");
        });
    }
    /*更新数据*/
    updateInfo(req, res, next,id){
        if(id){
            //更新数据
            let condition={_id:id};
            let param={
                accessKey:  req.body.accessKey,
                secretKey: req.body.secretKey,
                scope:req.body.scope,
                deadline: req.body.deadline
            };
            QiniuModel.update(condition,param,{upsert:true},function (err) {
                /*if(err){

                }*/
            });
        }
    }
    /*保存数据*/
    saveInfo(req, res, next){
        let that=this;
        let qiuniu = new QiniuModel({
            accessKey:  req.body.accessKey,
            secretKey: req.body.secretKey,
            scope:req.body.scope,
            deadline: req.body.deadline
        });
        qiuniu.save(function (err) {
            if(err){
                res.render("file",{
                    "code":"1",
                    "msg":"数据新增失败"
                });
            }
            else{
                that.getFile(req, res, next);
            }
        });
    }
}

export default new Qiniu()
