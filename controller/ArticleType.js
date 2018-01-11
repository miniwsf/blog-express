"use strict";

import ArticleTypeModel from "../models/ArticleType";
import * as errorStatus from "../controller/ErrorStatus";

class ArticleType {
    constructor(){
        this.deleteArticleType = this.deleteArticleType.bind(this);
        this.addArticleType = this.addArticleType.bind(this);
        this.getArticleTypeData=this.getArticleTypeData.bind(this);
        this.getArticleTypeMore=this.getArticleTypeMore.bind(this);
    }

    /*获取类别*/
    getArticleTypeData(req, res, next){
        return new Promise((resolve,reject) => {
            ArticleTypeModel.find({}, function (err, type) {
                if (err) {
                    reject();
                }
                else {
                    resolve(type);
                }
            });
        });
    }

    getArticleTypeMore(req, res, next){
        let that=this;
        that.getArticleTypeData(req, res, next).then(function (type) {
            /*try{
                /!*type.forEach(async function(item){

                });*!/
                let getNum=async (type) =>{
                    for(let item of type){
                        let typeid=item._id;
                        req.body.typeId=typeid;
                        /!* Article.getArticleNum(req, res, next).then(function (article,code,msg) {
                         item.num=article;
                         });*!/
                        item.num=await Article.getArticleNum(req, res, next);
                        console.log(item.num+"测试")
                    }
                }
                getNum(type);
            }
            catch (e){
                throw e;
            }
            req.body.typeId="";*/
            res.send({code:errorStatus.SUCCESS_CODE,msg:errorStatus.SUCCESS_MSG,type});
        });
    }

    deleteArticleType(req,res,next){
        ArticleTypeModel.remove({"_id":req.body.articleTypeId}, function (err) {
            if (err) {
                res.send({
                    code:errorStatus.Fail_CODE,
                    msg:errorStatus.Fail_MSG
                });
            }
            else{
                res.send({
                    code:errorStatus.SUCCESS_CODE,
                    msg:errorStatus.SUCCESS_MSG
                });
            }
        });
    }

    addArticleType(req,res,next){
        let articleType = new ArticleTypeModel({
            typeName:  req.body.type
        });
        articleType.save(function (err, response) {
            if(err){
                res.send({
                    code:errorStatus.Fail_CODE,
                    msg:errorStatus.Fail_MSG
                });
            }
            else{
                res.send({
                    code:errorStatus.SUCCESS_CODE,
                    msg:errorStatus.SUCCESS_MSG
                });
            }
        });
    }
}

export default new ArticleType();
