"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _Article = require("../models/Article");var _Article2 = _interopRequireDefault(_Article);
var _ArticleType = require("../controller/ArticleType");var _ArticleType2 = _interopRequireDefault(_ArticleType);
var _common = require("../controller/common");var _common2 = _interopRequireDefault(_common);
var _ErrorStatus = require("../controller/ErrorStatus");var errorStatus = _interopRequireWildcard(_ErrorStatus);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Article = function () {
    function Article() {_classCallCheck(this, Article);
        this.getArticleData = this.getArticleData.bind(this); /*查询*/
        this.deleteArticle = this.deleteArticle.bind(this); /*删除*/
        this.getBlogMore = this.getBlogMore.bind(this);
        this.getArticleNum = this.getArticleNum.bind(this); /*获得文章数量*/
        this.getBlogDetail = this.getBlogDetail.bind(this); /*获得具体文章信息*/
        this.addArticle = this.addArticle.bind(this); /*新增*/
        this.updateArticle = this.updateArticle.bind(this); /*更新*/
        this.updateArticleNew = this.updateArticleNew.bind(this);
        this.praiseBlog = this.praiseBlog.bind(this); /*点赞*/
        this.getArticleDataById = this.getArticleDataById.bind(this);
        this.updateAndSave = this.updateAndSave.bind(this); /*判断是更新还是新增*/
    }

    /*查询文章数量*/_createClass(Article, [{ key: "getArticleNum", value: function getArticleNum(
        req, res, next) {
            var id = req.query.articleId;
            var typeId = req.body.typeId;
            var title = req.body.title;
            var selectParam = {};
            if (id) {
                selectParam._id = id;
            }
            if (title) {
                selectParam.title = title;
            }
            if (typeId) {
                selectParam.type = typeId;
            }
            //获取分页数据
            return new Promise(function (resolve, reject) {
                _Article2.default.find(selectParam).exec(function (err, article) {
                    if (err) {
                        reject();
                    } else
                    {
                        resolve(article.length);
                    }
                });
            });
        }

        //搜索数据  _id和title
    }, { key: "getArticleData", value: function getArticleData(req, res, next) {
            var id = "";
            if (req.query.articleId) {
                id = req.query.articleId;
            } else
            if (req.body.articleId) {
                id = req.query.articleId;
            } else
            {
                id = id = req.params.articleId;
            }
            var typeId = req.body.typeId;
            var title = req.body.title;
            var page = req.body.page ? req.body.page - 1 : 0;
            var limit = req.body.limit ? parseInt(req.body.limit) : 5;
            var selectParam = {};
            if (id) {
                selectParam._id = id;
            }
            if (title) {
                selectParam.title = title;
            }
            if (typeId) {
                selectParam.type = typeId;
            }
            //获取分页数据
            var articleData = [];
            return new Promise(function (resolve, reject) {
                _Article2.default.find(selectParam).skip(page * limit).limit(limit).sort({ "create_time": "desc" }).populate(["type", "author"]).exec(function (err, article) {
                    if (err) {
                        reject();
                    } else
                    {
                        article.forEach(function (item) {
                            var time = new Date(parseInt(item.create_time));
                            item.create_time = _common2.default.getTimeStr(time);

                            //获得纯文本
                            item.txt = _common2.default.getHTMLToText(item.contentHtml);

                            //获取封面图
                            item.image = _common2.default.getImage(item.content);

                            var itemNew = {
                                author: {
                                    nickName: item.author.nickName,
                                    avatar: item.author.avatar },

                                content: item.content,
                                contentHtml: item.contentHtml,
                                create_time: item.create_time,
                                keywords: item.keywords,
                                txt: item.txt,
                                image: item.image,
                                praiseNumber: item.praiseNumber,
                                readAmount: item.readAmount,
                                title: item.title,
                                type: item.type,
                                _id: item._id };

                            articleData.push(itemNew);
                        });
                        resolve(articleData);
                    }
                });
            });
        } }, { key: "getBlogMore", value: function getBlogMore(

        req, res, next) {
            var that = this;
            that.getArticleData(req, res, next).then(function (article) {
                res.send({ code: errorStatus.SUCCESS_CODE, msg: errorStatus.SUCCESS_MSG, article: article });
            });
        } }, { key: "getBlogDetail", value: function getBlogDetail(

        req, res, next) {
            var id = req.params.articleId;
            if (!id) {
                this.getBlog();
            } else
            {
                //更新数据
                var condition = { _id: id };
                var param = { "$inc": { "readAmount": 1 } };
                this.updateArticle(condition, param);
                this.getArticleData(req, res, next).then(function (article, code, msg) {
                    res.render("home/blogDetail", { code: code, msg: msg, article: article, layout: "index" });
                });
            }
        }

        //数据更新
    }, { key: "updateArticleNew", value: function updateArticleNew(req, res, next) {
            var id = req.query.articleId;
            if (id) {
                //更新数据
                var condition = { _id: id };
                var param = { "$inc": { "readAmount": 1 } };
                this.updateArticle(condition, param);
                this.getArticleData(req, res, next).then(function (article, code, msg) {
                    res.render("article/article", { code: code, msg: msg, article: article });
                });
            }
        } }, { key: "deleteArticle", value: function deleteArticle(

        req, res, next) {
            _Article2.default.remove({ "_id": req.body.articleId }, function (err) {
                if (err) {
                    res.send({
                        code: errorStatus.Fail_CODE,
                        msg: errorStatus.Fail_MSG });

                } else
                {
                    res.send({
                        code: errorStatus.SUCCESS_CODE,
                        msg: errorStatus.SUCCESS_MSG });

                }
            });
        }
        //更新或保存
    }, { key: "updateAndSave", value: function updateAndSave(req, res, next) {
            var that = this;
            if (!req.body.articleId) {
                that.addArticle(req, res, next);
                res.send({ code: errorStatus.SUCCESS_CODE, msg: errorStatus.SUCCESS_MSG });
            } else
            {
                that.getArticleData(req, res, next).then(function (article) {
                    if (!article || article.length <= 0) {
                        that.addArticle(req, res, next);
                    } else
                    {
                        var condition = { _id: req.body.articleId };
                        var param = {
                            title: req.body.titleAdd,
                            content: req.body.contentAdd,
                            contentHtml: req.body.contentHAdd,
                            type: req.body.typeAdd,
                            latestTime: new Date().getTime(),
                            keywords: req.body.keywordsAdd };

                        that.updateArticle(condition, param);
                    }
                    res.send({ code: errorStatus.SUCCESS_CODE, msg: errorStatus.SUCCESS_MSG });
                });
            }
        } }, { key: "addArticle", value: function addArticle(

        req, res, next) {
            try {
                var article = new _Article2.default({
                    title: req.body.titleAdd,
                    content: req.body.contentAdd,
                    contentHtml: req.body.contentHAdd,
                    type: req.body.typeAdd,
                    create_time: new Date().getTime(),
                    author: req.api_user.id,
                    keywords: req.body.keywordsAdd,
                    readAmount: 0,
                    praiseNumber: 0 });

                article.save(function (err, response) {
                    if (err) {
                        throw err;
                    }
                });
            } catch (e) {
                throw e;
            }
        } }, { key: "getArticleDataById", value: function getArticleDataById(
        req, res, next) {
            var that = this;
            _ArticleType2.default.getArticleTypeData(req, res, next).then(function (type, code, msg) {
                var data = {};
                if (req.query.articleId) {
                    that.getArticleData(req, res, next).then(function (article, code, msg) {
                        data = article.length > 0 ? article[0] : null;
                        res.render("article/articleAdd", { code: code, msg: msg, data: data, type: type });
                    });
                } else
                {
                    res.render("article/articleAdd", { code: code, msg: msg, data: data, type: type });
                }
            });
        }
        /*更新数据，木有写好*/ }, { key: "updateArticle", value: function updateArticle(
        condition, param) {
            _Article2.default.update(condition, param, { upsert: true }, function (err, response) {
                if (err) {
                    throw err;
                }
            });
        }
        /*点赞*/ }, { key: "praiseBlog", value: function praiseBlog(
        req, res, next) {
            var id = req.params.articleId;
            var condition = { _id: id };
            var param = { "$inc": { "praiseNumber": 1 } };
            this.updateArticle(condition, param);
            this.getArticleData(req, res, next).then(function (article, code, msg) {
                res.render("home/blogDetail", { code: code, msg: msg, article: article, layout: "index" });
            });
        } }]);return Article;}();exports.default =


new Article();