'use strict';
import AdminModel from '../models/Admin'
class UserCheck {
	constructor(){
		this.checkLogin = this.checkLogin.bind(this);
	}
  	//检测是否登录
	checkLogin(req, res, next){
		let username=req.cookies.userName;
		let psd=req.cookies.psd;
        console.log(username);
		if(!username||!psd){
            res.render('login',{layout:null});
            return false;
		}
        AdminModel.find({userName:username,password:psd}, function (err, user) {
            if(err){
                res.render('login',{layout:null});
            }
            else{
                if(user.length>0){

                }
                else{
                    res.render('login',{layout:null});
                    return false;
                }
            }
        })
	}
}

export default new UserCheck()
