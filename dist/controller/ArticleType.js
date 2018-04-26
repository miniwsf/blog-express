"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _ArticleType = require("../models/ArticleType");var _ArticleType2 = _interopRequireDefault(_ArticleType);
var _ErrorStatus = require("../controller/ErrorStatus");var errorStatus = _interopRequireWildcard(_ErrorStatus);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

ArticleType = function () {
    function ArticleType() {_classCallCheck(this, ArticleType);
        this.deleteArticleType = this.deleteArticleType.bind(this);
        this.addArticleType = this.addArticleType.bind(this);
        this.getArticleTypeData = this.getArticleTypeData.bind(this);
        this.getArticleTypeMore = this.getArticleTypeMore.bind(this);
    }

    /*获取类别*/_createClass(ArticleType, [{ key: "getArticleTypeData", value: function getArticleTypeData(
        req, res, next) {
            return new Promise(function (resolve, reject) {
                _ArticleType2.default.find({}, function (err, type) {
                    if (err) {
                        reject();
                    } else
                    {
                        resolve(type);
                    }
                });
            });
        } }, { key: "getArticleTypeMore", value: function getArticleTypeMore(

        req, res, next) {
            var that = this;
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

                res.send({ code: errorStatus.SUCCESS_CODE, msg: errorStatus.SUCCESS_MSG, type: type });
            });
        } }, { key: "deleteArticleType", value: function deleteArticleType(

        req, res, next) {
            _ArticleType2.default.remove({ "_id": req.body.articleTypeId }, function (err) {
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
        } }, { key: "addArticleType", value: function addArticleType(

        req, res, next) {
            var articleType = new _ArticleType2.default({
                typeName: req.body.type });

            articleType.save(function (err, response) {
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
        } }]);return ArticleType;}();exports.default =


new ArticleType();