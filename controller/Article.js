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
        this.getBlogMore = this.getBlogMore.bind(this);
        this.getHome = this.getHome.bind(this);
        this.getBlogDetail = this.getBlogDetail.bind(this);
		this.addArticle = this.addArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.updateArticleNew = this.updateArticleNew.bind(this);
        this.praiseBlog = this.praiseBlog.bind(this);
	}

	//搜索数据  _id和title
    getArticleData(req, res, next){
		let id=req.query.articleId;
        let typeId=req.query.typeId;
		let title=req.body.title;
		let page=req.body.page?req.body.page-1:0;
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
		let articleData=null;
		return new Promise((resolve, reject) => {
            ArticleModel.find(selectParam).skip(page*5).limit(5).sort({'create_time':'desc'}).populate({ path: 'type', select: { typeName: 1 }}).exec(function (err, article) {
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
                        let timeStr=year+"-"+month+"-"+day+" "+hour+":"+minute;
                        item.create_time=timeStr;

                        //获得纯文本
                        let str=item.contentHtml;
                        str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
            			str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
            			str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
            			str=str.replace(/\s/g,''); //将空格去掉
            			item.txt=str;

            			//获取封面图
                        let imgReg=/.*!\[.*?\]\(.*?\).*/;
                        let arr=item.content.match(imgReg);
                        let image="";
                        if(arr&&arr.length>0){
                        	for(var info of arr){
                        		let imgInfo=info.split("(");
                        		if(imgInfo.length>=2){
                                    image=imgInfo[1].split(")")[0];
                                    break;
								}
								else{
                        			break;
								}
							}
						}
                        item.image=image;
                    });
                    articleData=article;
                    msg="成功";
                    status="0";
                    resolve(article,status,msg);
                }
            })
        });
	}

	getArticle(req, res, next){
		checkLogin.checkLogin(req, res, next);
		this.getArticleData(req, res, next).then(function (article,code,msg) {
			res.render("article",{code,msg,article});
		});
	}

    getHome(req, res, next){
        let that=this;
        ArticleType.getArticleTypeData(req, res, next).then(function (type,code,msg) {
            that.getArticleData(req, res, next).then(function (article,code,msg) {
                let [recommendArticle,article1=null,article2=null,article3=null]=article;
                let articleLatest=[article1,article2,article3];
                res.render("home",{code,msg,recommendArticle,articleLatest,type,layout:"index"});
            });
        })
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

    getBlogMore(req, res, next){
        let that=this;
        ArticleType.getArticleTypeData(req, res, next).then(function (type,code,msg) {
            that.getArticleData(req, res, next).then(function (article,code,msg) {
                res.send({code,msg,article,type});
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

	//数据更新
	updateArticleNew(req, res, next){
        let id=req.query.articleId;
        if(id){
            //更新数据
            let condition={_id:id};
            let param={'$inc':{'readAmount':1}};
            this.updateArticle(condition,param);
            this.getArticleData(req, res, next).then(function (article,code,msg) {
                res.render("article",{code,msg,article});
            });
        }
	}

	deleteArticle(req,res,next){
        checkLogin.checkLogin(req, res, next);
		let that=this;
		ArticleModel.remove({"_id":req.body.articleId}, function (err, article) {
			if (err) {
				res.send({
					code:"1",
					msg:err
				})
			}
			else{
				//that.getArticle(req, res, next);
                that.getArticleData(req, res, next).then(function (article,code,msg) {
                    res.send({code,msg,article});
                });
			}
		})
	}

	addArticle(req,res,next){
        checkLogin.checkLogin(req, res, next);
        let that=this;
		let article = new ArticleModel({
			title:  req.body.title,
			content: req.body.content,
            contentHtml:req.body.contentH,
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
		  else{
              that.getArticle(req, res, next);
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

	updateBlog(req,res,next){

	}
}

export default new Article()
