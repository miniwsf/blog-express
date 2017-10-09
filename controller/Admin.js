'use strict';

import AdminModel from '../models/Admin'
let crypto = require('crypto');
let hash = crypto.createHash("md5");

class Admin {
	constructor(){
		this.login = this.login.bind(this);
	}

	login(req, res, next){
        let username=req.body.username;
		let password=req.body.password;
		if(!username||!password){
			res.send({code:"1",msg:"请输入用户名或密码"});
			return;
		}
        hash.update(new Buffer(password, "binary"));
        let encodepsd = hash.digest('hex');

		AdminModel.find({userName:username,password:encodepsd}, function (err, user) {
			if(err){
				res.render("login",{code:"1",msg:"网络错误"});
			}
			else{
				if(user.length>0){
                    res.cookie('userName',username);
                    res.cookie('psd',password);
					res.send({code:"0",msg:"登陆成功"});
				}
				else{
					res.render("login",{code:"1",msg:"用户名或密码不正确"});
				}
			}
		})
	}
}

export default new Admin()
