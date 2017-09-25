'use strict';

import ArticleModel from '../models/Article'
import ArticleType from '../controller/ArticleType'
import checkLogin from '../middlewares/checkLogin'

let marked=require("marked");
class Article {
	constructor(){
		this.getArticle = this.getArticle.bind(this);
		this.getArticleData = this.getArticleData.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
        this.getBlog = this.getBlog.bind(this);
        this.getBlogDetail = this.getBlogDetail.bind(this);
		this.addArticle = this.addArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.praiseBlog = this.praiseBlog.bind(this);
	}

	//搜索数据  _id和title
    getArticleData(req, res, next){
		let id=req.query.articleId;
        let typeId=req.query.typeId;
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
		let status="1";
		let msg="数据查询失败";
		let articleData=null;
		return new Promise((resolve, reject) => {
            ArticleModel.find(selectParam).populate({ path: 'type', select: { typeName: 1 }}).exec(function (err, article) {
                if (err) {
                }
                else{
                    article.forEach(item => {
                        let time = new Date(parseInt(item.create_time));
                        let year=time.getFullYear();
                        let day=time.getDate();
                        let month=time.getMonth()+1;
                        let hour=time.getHours();
                        let minute=time.getMinutes();
                        let second=time.getSeconds();
                        let timeStr=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                        item.create_time=timeStr;
                        item.content=marked(item.content);

                        //获得纯文本
                        let str=item.content;
                        str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
            			str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
            			str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
            			str=str.replace(/\s/g,''); //将空格去掉
            			item.txt=str;
                    })
                    articleData=article;
                    msg="成功";
                    status="0";
                    resolve(article,status,msg);
                }
            })
        });
	}

	getArticle(req, res, next){
		/*if(!checkLogin.checkLogin(req, res, next)){
			return false;
		}*/
		this.getArticleData(req, res, next).then(function (article,code,msg) {
			res.render("article",{code,msg,article});
		});
	}

	/*获取博客信息及其分类*/
	getBlog(req, res, next){
		let that=this;
        ArticleType.getArticleTypeData(req, res, next).then(function (type,code,msg) {
            that.getArticleData(req, res, next).then(function (article,code,msg) {
                res.render("blog",{code,msg,article,type,layout:"index"});
            });
        })
	}

	getBlogDetail(req, res, next){
        let id=req.query.articleId;
        if(!id){
            this.getBlog();
		}
		else{
			//更新数据
			let condition={_id:id};
			let param={'$inc':{'readAmount':1}};
			this.updateArticle(condition,param);
            this.getArticleData(req, res, next).then(function (article,code,msg) {
                res.render("blogDetail",{code,msg,article,layout:"index"});
            });
		}
	}

	deleteArticle(req,res,next){
		if(!checkLogin.checkLogin(req, res, next)){
			return false;
		}
		let that=this;
		ArticleModel.remove({"_id":req.query.articleId}, function (err, article) {
			if (err) {
					res.send({
						code:"1",
						msg:err
					})
			}
			else{
				that.getArticle(req, res, next);
			}
		})
	}

	addArticle(req,res,next){
		/*if(!checkLogin.checkLogin(req, res, next)){
			return false;
		}*/
		let article = new ArticleModel({
				title:  req.body.title,
				content: req.body.content,
				type: req.body.type,
				create_time: new Date().getTime(),
				author: "wsf",
				keywords: req.body.keywords,
				readAmount:0,
				praiseNumber:0
		});

		article.save(function (err, response) {
		  if(err){
			res.render("article",{
				"code":"1",
				"msg":"数据新增失败"
			})
		  }
		});
	}

	/*更新数据，木有写好*/
	updateArticle(condition,param){
       // let article = new ArticleModel(param);
        ArticleModel.update(condition,param,{upsert:true},function (err, response) {
            if(err){
                /*res.render("article",{
                    "code":"1",
                    "msg":"更新数据失败"
                })*/
            }
        });
	}
	praiseBlog(req,res,next){
		let id=req.query.articleId;
		let condition={_id:id};
		let param={'$inc':{'praiseNumber':1}};
		this.updateArticle(condition,param);
		this.getArticleData(req, res, next).then(function (article,code,msg) {
	        res.render("blogDetail",{code,msg,article,layout:"index"});
	    });
	}
}

export default new Article()
