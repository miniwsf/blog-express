"use strict";

import AdminModel from "../models/Admin";
import * as errorStatus from "./errorStatus";
let jwt = require("jsonwebtoken");

class Admin {
    constructor(){
        this.login = this.login.bind(this);
        this.getData = this.getData.bind(this);
        this.getPersonal=this.getPersonal.bind(this);
        this.saveData=this.saveData.bind(this);
    }

    /*登录*/
    login(req, res, next){
        let {username=null,password=null}=req.body||{};
        if(!username||!password){
            res.send({code:"1003",msg:"请输入用户名或密码"});
            return;
        }
        /*获取加密密码*/
        let encodepsd=null;
        try{
            encodepsd=require("crypto").createHash("md5").update(new Buffer(password, "binary")).digest("hex");
        }
        catch ( e ){
            throw e;
        }

        AdminModel.find({userName: username},function(err, user){
            if (err)
                throw err;
            if (!user||user.length==0) {
                res.send({ code: "1000", message: "认证失败，用户名找不到" });
            }
            else if (user.length>0) {
                let [userNew]=user;
                // 检查密码
                if (userNew.password != encodepsd) {
                    res.send({ code: "1001", message: "认证失败，密码错误" });
                } else {
                    // 创建token
                    let userToken={
                        userName:userNew.userName,
                        password:userNew.password,
                        id:userNew._id
                    };
                    let token = jwt.sign(userToken, "app.get(superSecret)", {
                        "expiresIn": 1440 // 设置过期时间
                    });
                    res.cookie("token",token);
                    res.send({
                        code: "0",
                        message: "登录成功"
                    });
                }
            }
        });
    }
    /*获取登录用户个人信息*/
    getPersonal(req, res, next){
        let that=this;
        let id=req.api_user.id;  //用户id
        if(!id){
            res.render("user",{user:{}});
        }
        else{
            that.getData(req, res, next).then(function (data) {
                let [user={}]=data;
                res.send({code:errorStatus.SUCCESS_CODE,user:user});
            });
        }
    }
    /*获取数据*/
    getData(req, res, next){
        let id=req.api_user.id;  //用户id
        let selectParam={};
        if(id){
            selectParam._id=id;
        }
        return new Promise((resolve,reject)=> {
            AdminModel.find(selectParam, function (err, user) {
                if (err)
                    throw err;
                else {
                    resolve(user);
                }
            });
        });
    }

    saveData(req, res, next){
        let admin = {
            nickName:req.body.nickName,
            avatar:req.body.avatar
        };
        let password=req.body.password;
        if(password){
            let encodepsd =require("crypto").createHash("md5").update(new Buffer(password, "binary")).digest("hex");
            admin.password=encodepsd;
        }
        AdminModel.update({_id:req.body.id},admin,{upsert:true},function (err, response) {
            if(err){
                throw err;
            }
            else{
                res.send({code:"0",msg:"保存成功"});
            }
        });
    }
}

export default new Admin();
