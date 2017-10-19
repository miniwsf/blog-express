'use strict';

import AdminModel from '../models/Admin'
let crypto = require('crypto');
let hash = crypto.createHash("md5");
let jwt = require('jsonwebtoken');

class Admin {
	constructor(){
		this.login = this.login.bind(this);
        this.getData = this.getData.bind(this);
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
				// 检查密码
				if (user.password == encodepsd) {
					res.send({ code: "1001", message: '认证失败，密码错误' });
				} else {
					// 创建token
					let userToken={
                        userName:user.userName,
						password:user.password
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
	/*获取数据*/
	getData(req, res, next){
		let id=req.body.userId;  //用户id
		let selectParam={};
		if(id){
            selectParam._id=id;
		}
	}
}

export default new Admin()
