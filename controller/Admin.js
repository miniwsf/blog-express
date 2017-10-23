"use strict";

import AdminModel from "../models/Admin";
let jwt = require("jsonwebtoken");
const EXPIRE_TIME=1440;

class Admin {
    constructor(){
        this.login = this.login.bind(this);
        this.getData = this.getData.bind(this);
        this.getPersonal=this.getPersonal.bind(this);
        this.saveData=this.saveData.bind(this);
    }

    /*登录*/
    login(req, res){
        let username=req.body.username;    /*获取用户名和密码*/
        let password=req.body.password;
        let code;
        let errorMsg;
        if(!username||!password){
            code="400";
            errorMsg="请求参数错误";
            res.send({code,msg:errorMsg});
            return;
        }
        /*获取加密密码*/
        let encodepsd="";
        try{
            encodepsd=require("crypto").createHash("md5").update(new Buffer(password, "binary")).digest("hex");  /*密码加密*/

<<<<<<< HEAD
            AdminModel.find({userName: username},function(err, user){
                if (err)
                    throw err;
                if (!user||user.length==0) {
                    code="401";
                    errorMsg="认证失败，用户名找不到";
                    res.send({code,msg:errorMsg});
                }
                else if (user.length>0) {
                    let [userNew]=user;
                    // 检查密码
                    if (userNew.password != encodepsd) {
                        code="401";
                        errorMsg="认证失败，密码错误";
                        res.send({code,msg:errorMsg});
                    } else {
                        // 创建token
                        let userToken={
                            userName:userNew.userName,
                            password:userNew.password,
                            id:userNew._id
                        };
                        let token = jwt.sign(userToken, "app.get(superSecret)", {
                            "expiresIn": EXPIRE_TIME // 设置过期时间
                        });
                        res.cookie("token",token);
                        res.cookie("userId",userNew._id);
                        code="200";
                        errorMsg="请求成功";
                        res.send({code,msg:errorMsg});
                    }
                }
            });
        }
        catch ( e ){
            //console.log(e);
        }
    }

    /*获取登录用户个人信息*/
    getPersonal(req, res, next){
        let that=this;
        let id=req.cookies.userId;  //用户id
        if(!id){
=======
        AdminModel.find({userName: username},function(err, user){
			if (err)
				throw err;
			if (!user||user.length==0) {
				res.send({ code: "1000", message: '认证失败，用户名找不到' });
			}
			else if (user.length>0) {
				let userNew=user[0];
				// 检查密码
				if (userNew.password != encodepsd) {
					res.send({ code: "1001", message: '认证失败，密码错误' });
				} else {
					// 创建token
					let userToken={
                        userName:userNew.userName,
						password:userNew.password,
						id:userNew._id
					};
					let token = jwt.sign(userToken, 'app.get(superSecret)', {
						'expiresIn': 1440 // 设置过期时间
					});
                    res.cookie('token',token);
					res.send({
						code: "0",
						message: 'Enjoy your token!',
						token: token
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
>>>>>>> 39b7c2b1e617d84e460dae27f556777d6867b795
            res.render("user",{user:{}});
        }
        else{
            that.getData(req, res, next).then(function (data) {
                let [user={}]=data;
                res.render("user",{user:user});
<<<<<<< HEAD
            });
        }
    }
    /*获取数据*/
    getData(req){
        let id=req.cookies.userId;  //用户id
        let selectParam={};
        if(id){
=======
            })
		}
	}
	/*获取数据*/
	getData(req, res, next){
		let id=req.api_user.id;  //用户id
		let selectParam={};
		if(id){
>>>>>>> 39b7c2b1e617d84e460dae27f556777d6867b795
            selectParam._id=id;
        }
        return new Promise((resolve)=> {
            AdminModel.find(selectParam, function (err, user) {
                if (err)
                    throw err;
                else {
                    resolve(user);
                }
            });
        });
    }

    /*保存数据*/
    saveData(req, res){
        let admin = {
            nickName:  req.body.nickName,
            avatar:req.body.avatar
        };
        let password=req.body.password;
        if(password){
            let encodepsd =require("crypto").createHash("md5").update(new Buffer(password, "binary")).digest("hex");
            admin.password=encodepsd;
        }
        AdminModel.update({_id:req.body.id},admin,{upsert:true},function (err) {
            if(err){
                throw err;
            }
            else{
                res.send({code:"200",msg:"保存成功"});
            }
        });
    }
}

export default new Admin();
