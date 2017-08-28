'use strict';

import AdminModel from '../models/Admin'
class Admin {
	constructor(){
		this.login = this.login.bind(this);
	}

	login(req, res, next){
			AdminModel.find({userName:res.body.username,password:res.body.password}, function (err, user) {

			})
	}
}

export default new Admin()
