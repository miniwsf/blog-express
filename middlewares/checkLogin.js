'use strict';

import Admin from '../controller/Admin'
class UserCheck {
	constructor(){
		this.checkLogin = this.checkLogin.bind(this);
	}
  	//检测是否登录
	checkLogin(req, res, next){
		console.log(req.cookie)
    	let cookie=window.document.cookie;
    	let cookieParam=cookie.split(";");
    	let start=cookie.indexOf("name");
    	let end=cookie.indexOf("psd");
    	if(start==-1||end==-1){
    		res.render("login",{code:"1",msg:"登录失败"});
    		return false
    	}
    	else{
    		let loginStatus=Admin.login();
    		if(loginStatus.code!="0"){
    			res.render("login",{code:"1",msg:"登录失败"});
    			return false;
    		}
    		else{
    			res.render("login",{code:"1",msg:"登录失败"});
    			return true;
    		}
    	}
	}
}

export default new UserCheck()
