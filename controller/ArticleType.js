'use strict';

import ArticleTypeModel from '../models/ArticleType'
import Article from '../controller/Article'
import checkLogin from '../middlewares/checkLogin'

class ArticleType {
	constructor(){
		this.getArticleType = this.getArticleType.bind(this);
		this.deleteArticleType = this.deleteArticleType.bind(this);
		this.addArticleType = this.addArticleType.bind(this);
		this.getArticleTypeData=this.getArticleTypeData.bind(this);
        this.getArticleTypeOther=this.getArticleTypeOther.bind(this);
	}

	/*获取类别*/
    getArticleTypeData(req, res, next){
        let status="1";
        let msg="数据查询失败";
    	return new Promise((resolve, reject) => {
            ArticleTypeModel.find({}, function (err, type) {
                if (err) {
                    status="-1";
                    msg="数据查询失败";
                    resolve(type,status,msg);
                }
                else {
                	//查询文章数目
                    type.forEach(item=>{
                    	let typeid=item._id;
                        req.query.typeId=typeid;
                        Article.getArticleData(req, res, next).then(function (article,code,msg) {
                            item.num=article.length;
                        });
					});
                    status="0";
                    msg="数据查询成功";
                    resolve(type,status,msg);
                }
            })
        })
    }

	getArticleType(req, res, next){
        checkLogin.checkLogin(req, res, next);
        this.getArticleTypeData(req, res, next).then(function (type,code,msg) {
            res.render("articleType",{code,msg,type});
        });
	}

	getArticleTypeOther(req, res, next){
        checkLogin.checkLogin(req, res, next);
        this.getArticleTypeData(req, res, next).then(function (type,code,msg) {
            res.render("articleAdd",{code,msg,type});
        });
	}

	deleteArticleType(req,res,next){
        checkLogin.checkLogin(req, res, next);
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
        checkLogin.checkLogin(req, res, next);
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
		  else{
              that.getArticleType(req, res, next);
		  }
		});
	}

	updateArticleType(req,res,next){

	}
}

export default new ArticleType()
