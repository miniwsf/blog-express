"use strict";

import ArticleTypeModel from "../models/ArticleType";
import Article from "../controller/Article";

class ArticleType {
    constructor(){
        this.deleteArticleType = this.deleteArticleType.bind(this);
        this.addArticleType = this.addArticleType.bind(this);
        this.getArticleTypeData=this.getArticleTypeData.bind(this);
        this.getArticleTypeMore=this.getArticleTypeMore.bind(this);
    }

    /*获取类别*/
    getArticleTypeData(req, res, next){
        return new Promise((resolve) => {
            let status="1";
            let msg="数据查询失败";
            ArticleTypeModel.find({}, function (err, type) {
                if (err) {
                    status="-1";
                    msg="数据查询失败";
                    resolve(type,status,msg);
                }
                else {
                    status="0";
                    msg="数据查询成功";
                    resolve(type,status,msg);
                }
            });
        });
    }

    getArticleTypeMore(req, res, next){
        let that=this;
        that.getArticleTypeData(req, res, next).then(function (type,code,msg) {
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
            res.send({code,msg,type});
        });
    }

    deleteArticleType(req,res,next){
        ArticleTypeModel.remove({"_id":req.body.articleTypeId}, function (err) {
            if (err) {
                res.send({
                    code:"1",
                    msg:err
                });
            }
            else{
                res.send({
                    code:"0",
                    msg:"成功"
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
                    code:"1",
                    msg:err
                });
            }
            else{
                res.send({
                    code:"0",
                    msg:"成功"
                });
            }
        });
    }
}

export default new ArticleType();
