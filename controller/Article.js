'use strict';

import ArticleModel from '../models/Article'

class Article {
	constructor(){
		this.getArticle = this.getArticle.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
		this.addArticle = this.addArticle.bind(this);
	}
	
	getArticle(req, res, next){
		ArticleModel.find({}, function (err, article) {
		  if (err) {
				res.render("article",{
					"code":"1",
					"msg":"数据查询失败"
				})
			}
		  else{
				res.render("article",{
					"code":"0",
					"article":article
				})
			}
		})
	}

	deleteArticle(req,res,next){
		ArticleModel.remove({"_id":req.query.articleId}, function (err, article) {
			if (err) {
					res.send({
						code:"1",
						msg:err
					})
			}
			else{
				getArticle(req,res,next);
			}
		})
	}

	editArticle(req,res,next){

	}

	addArticle(req,res,next){
    let article = new ArticleModel({
			title:  req.body.title,
			content: req.body.content,
			type: req.body.type,
			create_time: new Date().getTime(),
			author: "11",
			keywords: req.body.keywords
    });
    article.save(function (err, res) {
      if(err){

      }else{

      }
    });
	}
}

export default new Article()
