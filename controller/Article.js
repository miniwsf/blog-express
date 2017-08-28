'use strict';

import ArticleModel from '../models/Article'
import Common from '../../public/js/common.js'
class Article {
	constructor(){
		this.getArticle = this.getArticle.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
		this.addArticle = this.addArticle.bind(this);
	}

	getArticle(req, res, next){
		ArticleModel.find().populate({ path: 'type', select: { typeName: 1 } }).exec(function (err, article) {
		  if (err) {
				res.render("article",{
					"code":"1",
					"msg":"数据查询失败"
				})
			}
		  else{
				article.forEach(item => {
				//	let time=item.create_time;
				//	item.create_time=Common.getTimeNew(time);
				})
				res.render("article",{
					"code":"0",
					"article":article
				})
			}
		})
	}

	getBlog(req, res, next){
		ArticleModel.find().populate({ path: 'type', select: { typeName: 1 } }).exec(function (err, article) {
		  if (err) {
				res.render("blog",{
					"code":"1",
					"msg":"数据查询失败",
					layout:"index"
				})
			}
		  else{
				article.forEach(item => {
				//	let time=item.create_time;
				//	item.create_time=Common.getTimeNew(time);
				})
				res.render("blog",{
					"code":"0",
					"article":article,
					layout:"index"
				})
			}
		})
	}

	deleteArticle(req,res,next){
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

		let that=this;
    article.save(function (err, response) {
      if(err){
				res.render("article",{
					"code":"1",
					"msg":"数据新增失败"
				})
      }else{
			//	that.getArticle(req, res, next);
      }
    });
	}

	updateArticle(req,res,next){

	}
}

export default new Article()
