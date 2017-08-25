'use strict';

import AdminModel from '../models/Admin'
//const jwt = require('jsonwebtoken')
const app = require('express')()

class Admin {
	constructor(){
		this.login = this.login.bind(this)
	}
	login(req, res, next){
		if(!res.body.username||!res.body.password){
			res.render("/login",{
				code:"-1",
				msg:"用户名或密码不能为空哦！"
			});
		}
		else {
			AdminModel.findOne({userName:res.body.username,password:res.body.password}, function (err, article) {
			  if (err) {
					res.render("login",{
						"code":"-1",
						"msg":"登录失败"
					})
				}
			  else{
					if(article&&article.length>0){
						//登录成功
						/*const mytoken = jwt.sign({id:res.body.username, name:res.body.password}, 'didi', {expiresIn: '1d'})
						app.use(BodyParser.json());
						app.post('/token', (req, res) => res.json({token: mytoken}))*/
						res.render("/login");
					}
					else{
						res.render("/login",{
							code:"-1",
							msg:"用户名或密码错误"
						});
					}
				}
			})
		}
	}
}

export default new Admin()
