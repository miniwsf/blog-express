'use strict';

import AdminModel from '../models/Admin'
let crypto = require('crypto');
let hash = crypto.createHash("md5");
let jwt = require('jsonwebtoken');

class Admin {
	constructor(){
		this.login = this.login.bind(this);
        this.getData = this.getData.bind(this);
        this.getPersonal=this.getPersonal.bind(this);
        this.saveData=this.saveData.bind(this);
	}

	/*登录*/
    login(req, res, next){
        let username=req.body.username;
        let password=req.body.password;
        if(!username||!password){
            res.send({code:"1003",msg:"请输入用户名或密码"});
            return;
        }
        /*获取加密密码*/
        hash.update(new Buffer(password, "binary"));
        let encodepsd = hash.digest('hex');
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
						password:userNew.password
					};
					let token = jwt.sign(userToken, 'app.get(superSecret)', {
						'expiresIn': 1440 // 设置过期时间
					});
                    res.cookie('token',token);
                    res.cookie('userId',userNew._id);
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
        let id=req.cookies.userId;  //用户id
		if(!id){
            res.render("user",{user:{}});
		}
		else{
            that.getData(req, res, next).then(function (data) {
                let [user={}]=data;
                res.render("user",{user:user});
            })
		}
	}
	/*获取数据*/
	getData(req, res, next){
		let id=req.cookies.userId;  //用户id
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
        })
	}
	saveData(req, res, next){
        let admin = {
            nickName:  req.body.nickName,
            avatar:req.body.avatar
        };
        let password=req.body.password;
        if(password){
            hash.update(new Buffer(password, "binary"));
            let encodepsd = hash.digest('hex');
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

export default new Admin()
