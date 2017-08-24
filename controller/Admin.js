'use strict';

import AdminModel from '../models/Admin'

class Admin {
	constructor(){
		this.login = this.login.bind(this)
	}
	login(req, res, next){
		if(res.body.username=="111"&&res.body.password=="111"){
			res.render("/article");
		}
		else{
			res.send({code:-1,message:"error"});
		}
	}
}

export default new Admin()
