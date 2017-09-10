'use strict';

import AdminModel from '../models/Admin'
import Article from '../controller/Article'
class Admin {
	constructor(){
		this.login = this.login.bind(this);
	}

	login(req, res, next){
		let username=req.body.username;
		let password=req.body.password;
		if(!username||!password){
			//res.render("blog",{code:"1",msg:"请输入用户名或密码"});
			res.send({code:"1",msg:"请输入用户名或密码"});
			return;
		}
		AdminModel.find({userName:username,password:password}, function (err, user) {
			if(err){
				//es.render("blog",{code:"1",msg:"登录失败"});
				res.send({code:"1",msg:"网络错误"});
			}
			else{
				if(user.length>0){
					//Article.getArticle();
					res.send({code:"0",msg:"登陆成功"});
				}
				else{
					//res.render("blog",{code:"1",msg:"登录失败"});
					document.cookie="name="+userName;
					document.cookie="psd="+password;
					res.send({code:"1",msg:"用户名或密码不正确"});
				}
			}
		})
	}
}

export default new Admin()
