'use strict';

import ArticleTypeModel from '../models/ArticleType'

class ArticleType {
	constructor(){
		this.getArticleType = this.getArticleType.bind(this);
		this.deleteArticleType = this.deleteArticleType.bind(this);
		this.addArticleType = this.addArticleType.bind(this);
	}

	getArticleType(req, res, next){
		ArticleTypeModel.find({}, function (err, type) {
		  if (err) {
				res.render("articleType",{
					"code":"1",
					"msg":"数据查询失败"
				})
			}
		  else{
				res.render("articleType",{
					"code":"0",
					"type":type
				})
			}
		})
	}

	getArticleTypeOther(req, res, next){
		ArticleTypeModel.find({}, function (err, type) {
		  if (err) {
				res.render("articleAdd",{
					"code":"1",
					"msg":"数据查询失败"
				})
			}
		  else{
				res.render("articleAdd",{
					"code":"0",
					"type":type
				})
			}
		})
	}

	deleteArticleType(req,res,next){
		let that=this;
		ArticleTypeModel.remove({"_id":req.query.articleTypeId}, function (err, article) {
			if (err) {
					res.send({
						code:"1",
						msg:err
					})
			}
			else{
				that.getArticleType(req, res, next);
			}
		})
	}

	addArticleType(req,res,next){
		let articleType = new ArticleTypeModel({
				typeName:  req.body.type
		});
		let that=this;
		articleType.save(function (err, response) {
		  if(err){
					res.render("articleType",{
						"code":"1",
						"msg":"数据新增失败"
					})
		  }
		});
	}

	updateArticleType(req,res,next){

	}
}

export default new ArticleType()
