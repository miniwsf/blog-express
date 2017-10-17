'use strict';

import QiniuModel from '../models/Qiniu'
import checkLogin from '../middlewares/checkLogin'

class Qiniu {
	constructor(){
		this.getToken=this.getToken.bind(this);
        this.getData=this.getData.bind(this);
        this.getFile=this.getFile.bind(this);
        this.saveInfo=this.saveInfo.bind(this);
        this.saveFileInfo=this.saveFileInfo.bind(this);
	}

	/*获取数据*/
	getData(req, res, next){
		let id=req.body.id;
		let selectParam={
            scope:'blog'
		};
		if(id){
			selectParam._id=id;
		}
        return new Promise((resolve, reject) => {
            QiniuModel.find(selectParam).exec(function (err, qiniu) {
                if (err) {
                }
                else {
                    resolve(qiniu,"0","查询成功");
                }
            })
        })
	}
	getToken(req, res, next){
        checkLogin.checkLogin(req, res, next);
        this.getToken(req, res, next).then(function (qiniu,code,msg) {
        	if(qiniu.length>0){
        		let token=qiniu[0].token;
        		if(token){
        			//res.send({token});
				}
				else{
        			//获取token
				}
			}
            res.send();
        });
	}
	/*渲染文件设置界面*/
	getFile(req, res, next){
        checkLogin.checkLogin(req, res, next);
        this.getData(req, res, next).then(function (qiniu,code,msg) {
            let data=null;
            if(qiniu.length>0){
                data=qiniu[0];
            }
            res.render("file",{code,msg,data});
        });
    }
    /*保存*/
    saveFileInfo(req, res, next){
        checkLogin.checkLogin(req, res, next);
	    let that=this;
        that.getData(req, res, next).then(function (qiniu,code,msg) {
            console.log(qiniu);
            if(qiniu.length>0){
                that.updateInfo(req, res, next,qiniu[0]._id);
            }
            else{
                console.log("进来没");
                that.saveInfo(req, res, next);
            }
        });
    }
    /*更新数据*/
    updateInfo(req, res, next,id){
        if(id){
            //更新数据
            let condition={_id:id};
            let param={
                accessKey:  req.body.accessKey,
                secretKey: req.body.secretKey,
                scope:req.body.scope,
                deadline: req.body.deadline
            };
            QiniuModel.update(condition,param,{upsert:true},function (err, response) {
                if(err){

                }
            });
        }
    }
	/*保存信息*/
	saveInfo(req, res, next){
        let that=this;
        let qiuniu = new QiniuModel({
            accessKey:  req.body.accessKey,
            secretKey: req.body.secretKey,
            scope:req.body.scope,
            deadline: req.body.deadline
        });
        console.log(qiuniu)
        qiuniu.save(function (err, response) {
            if(err){
                res.render("file",{
                    "code":"1",
                    "msg":"数据新增失败"
                })
            }
            else{
                that.getFile(req, res, next);
            }
        });
    }
}

export default new Qiniu()
