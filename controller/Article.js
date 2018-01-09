"use strict";

import ArticleModel from "../models/Article";
import ArticleType from "../controller/ArticleType";
import Common from "../controller/common";

class Article {
    constructor(){
        this.getArticle = this.getArticle.bind(this);
        this.getArticleData = this.getArticleData.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.getBlogMore = this.getBlogMore.bind(this);
        this.getArticleNum = this.getArticleNum.bind(this);
        this.getBlogDetail = this.getBlogDetail.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.updateArticleNew = this.updateArticleNew.bind(this);
        this.praiseBlog = this.praiseBlog.bind(this);
        this.getArticleDataById=this.getArticleDataById.bind(this);
        this.updateAndSave=this.updateAndSave.bind(this);
    }

    /*查询文章数量*/
    getArticleNum(req, res, next){
        let id=req.query.articleId;
        let typeId=req.body.typeId;
        let title=req.body.title;
        let selectParam={};
        if(id){
            selectParam._id=id;
        }
        if(title){
            selectParam.title=title;
        }
        if(typeId){
            selectParam.type=typeId;
        }
        //获取分页数据
        let status="1";
        let msg="数据查询失败";
        return new Promise((resolve, reject) => {
            ArticleModel.find(selectParam).exec(function (err, article) {
                if (err) {
                    throw err;
                }
                else{
                    resolve(article.length);
                }
            });
        });
    }

    //搜索数据  _id和title
    getArticleData(req, res, next){
        let id="";
        if(req.query.articleId){
            id=req.query.articleId;
        }
        else if(req.body.articleId){
            id=req.query.articleId;
        }
        else {
            id=id=req.params.articleId;
        }
        let typeId=req.body.typeId;
        let title=req.body.title;
        let page=req.body.page?req.body.page-1:0;
        let limit=req.body.limit?parseInt(req.body.limit):5;
        let selectParam={};
        if(id){
            selectParam._id=id;
        }
        if(title){
            selectParam.title=/.title.*/;
        }
        if(typeId){
            selectParam.type=typeId;
        }
        //获取分页数据
        let status="1";
        let msg="数据查询失败";
        let articleData=[];
        return new Promise((resolve, reject) => {
            ArticleModel.find(selectParam).skip(page*limit).limit(limit).sort({"create_time":"desc"}).populate(["type","author"]).exec(function (err, article) {
                if (err) {
                    reject();
                    throw err;
                }
                else{
                    article.forEach(item => {
                        let time = new Date(parseInt(item.create_time));
                        item.create_time=Common.getTimeStr(time);

                        //获得纯文本
                        item.txt=Common.getHTMLToText(item.contentHtml);

                        //获取封面图
                        item.image=Common.getImage(item.content);

                        let itemNew={
                            author:{
                                nickName:item.author.nickName,
                                avatar:item.author.avatar
                            },
                            content:item.content,
                            contentHtml:item.contentHtml,
                            create_time:item.create_time,
                            keywords:item.keywords,
                            txt:item.txt,
                            image:item.image,
                            praiseNumber:item.praiseNumber,
                            readAmount:item.readAmount,
                            title:item.title,
                            type:item.type,
                            _id:item._id
                        };
                        articleData.push(itemNew);
                    });
                    msg="成功";
                    status="0";
                    resolve(articleData,status,msg);
                }
            });
        });
    }

    getArticle(req, res, next){
        this.getArticleData(req, res, next).then(function (article,code,msg) {
            res.render("article/article",{code,msg,article});
        });
    }

    getBlogMore(req, res, next){
        let that=this;
        that.getArticleData(req, res, next).then(function (article,code,msg) {
            res.send({code,msg,article});
        });
    }

    getBlogDetail(req, res, next){
        let id=req.params.articleId;
        if(!id){
            this.getBlog();
        }
        else{
            //更新数据
            let condition={_id:id};
            let param={"$inc":{"readAmount":1}};
            this.updateArticle(condition,param);
            this.getArticleData(req, res, next).then(function (article,code,msg) {
                res.render("home/blogDetail",{code,msg,article,layout:"index"});
            });
        }
    }

    //数据更新
    updateArticleNew(req, res, next){
        let id=req.query.articleId;
        if(id){
            //更新数据
            let condition={_id:id};
            let param={"$inc":{"readAmount":1}};
            this.updateArticle(condition,param);
            this.getArticleData(req, res, next).then(function (article,code,msg) {
                res.render("article/article",{code,msg,article});
            });
        }
    }

    deleteArticle(req,res,next){
        ArticleModel.remove({"_id":req.body.articleId}, function (err) {
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
    //更新或保存
    updateAndSave(req,res,next){
        let that=this;
        if(!req.body.articleId){
            let code="0";
            let msg="成功";
            that.addArticle(req,res,next);
            res.send({code,msg});
        }
        else{
            that.getArticleData(req, res, next).then(function (article,code,msg) {
                if(!article||article.length<=0){
                    that.addArticle(req,res,next);
                }
                else{
                    let condition={_id:req.body.articleId};
                    let param={
                        title:  req.body.titleAdd,
                        content: req.body.contentAdd,
                        contentHtml:req.body.contentHAdd,
                        type: req.body.typeAdd,
                        latestTime: new Date().getTime(),
                        keywords: req.body.keywordsAdd
                    };
                    that.updateArticle(condition,param);
                }
                res.send({code,msg});
            });
        }
    }

    addArticle(req,res,next){
        try {
            let article = new ArticleModel({
                title: req.body.titleAdd,
                content: req.body.contentAdd,
                contentHtml: req.body.contentHAdd,
                type: req.body.typeAdd,
                create_time: new Date().getTime(),
                author: req.api_user.id,
                keywords: req.body.keywordsAdd,
                readAmount: 0,
                praiseNumber: 0
            });
            article.save(function (err, response) {
                if (err) {
                    throw err;
                }
            });
        }catch (e){
            console.log(e);
        }
    }
    getArticleDataById(req,res,next){
        let that=this;
        ArticleType.getArticleTypeData(req, res, next).then(function (type,code,msg) {
            let data={};
            if(req.query.articleId){
                that.getArticleData(req, res, next).then(function (article, code, msg) {
                    data=article.length>0?article[0]:null;
                    res.render("article/articleAdd", {code, msg, data,type});
                });
            }
            else{
                res.render("article/articleAdd", {code, msg, data,type});
            }
        });
    }
    /*更新数据，木有写好*/
    updateArticle(condition,param){
        ArticleModel.update(condition,param,{upsert:true},function (err, response) {
            if(err){
                throw err;
            }
        });
    }
    /*点赞*/
    praiseBlog(req,res,next){
        let id=req.params.articleId;
        let condition={_id:id};
        let param={"$inc":{"praiseNumber":1}};
        this.updateArticle(condition,param);
        this.getArticleData(req, res, next).then(function (article,code,msg) {
            res.render("home/blogDetail",{code,msg,article,layout:"index"});
        });
    }
}

export default new Article();
