'use strict';

class Admin{
	construct(){

	};
	getInfo(req, res, next){
		res.send({
			title: "luffy"
		})
	};
}
module.exports=new Admin();
