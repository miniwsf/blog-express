"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _Qiniu = require("../models/Qiniu");var _Qiniu2 = _interopRequireDefault(_Qiniu);
var _ErrorStatus = require("../controller/ErrorStatus");var errorStatus = _interopRequireWildcard(_ErrorStatus);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
var qinius = require("qiniu");var

Qiniu = function () {
    function Qiniu() {_classCallCheck(this, Qiniu);
        this.getToken = this.getToken.bind(this);
        this.getData = this.getData.bind(this);
        this.getFile = this.getFile.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
        this.saveFileInfo = this.saveFileInfo.bind(this);
    }

    /*获取数据*/_createClass(Qiniu, [{ key: "getData", value: function getData(
        req, res, next) {
            var id = req.body.id;
            var selectParam = {
                scope: "blog" };

            if (id) {
                selectParam._id = id;
            }
            return new Promise(function (resolve) {
                _Qiniu2.default.find(selectParam).exec(function (err, qiniu) {
                    if (err) {
                        resolve(null, "1", "查询失败");
                    } else
                    {
                        resolve(qiniu, "0", "查询成功");
                    }
                });
            });
        }
        /*获取数据*/ }, { key: "getToken", value: function getToken(
        req, res, next) {
            this.getData(req, res, next).then(function (qiniu, code, msg) {
                var data = null;
                var uploadToken = "";
                if (qiniu.length > 0) {
                    data = qiniu[0];
                    /*生成token*/
                    var mac = new qinius.auth.digest.Mac(data.accessKey, data.secretKey);
                    var putPolicy = new qinius.rs.PutPolicy({
                        scope: data.scope });

                    uploadToken = putPolicy.uploadToken(mac);
                }
                res.send({ code: code, msg: msg, uploadToken: uploadToken });
            });
        }
        /*渲染文件设置界面*/ }, { key: "getFile", value: function getFile(
        req, res, next) {
            this.getData(req, res, next).then(function (qiniu, code, msg) {
                var data = {};
                if (qiniu.length > 0) {
                    data = qiniu[0];
                }var _data =
                data,_data$accessKey = _data.accessKey,accessKey = _data$accessKey === undefined ? null : _data$accessKey,_data$secretKey = _data.secretKey,secretKey = _data$secretKey === undefined ? null : _data$secretKey,_data$scope = _data.scope,scope = _data$scope === undefined ? null : _data$scope,_data$deadline = _data.deadline,deadline = _data$deadline === undefined ? null : _data$deadline;
                res.send({ code: errorStatus.SUCCESS_CODE, msg: errorStatus.SUCCESS_MSG, data: { accessKey: accessKey, secretKey: secretKey, scope: scope, deadline: deadline } });
            });
        }
        /*保存*/ }, { key: "saveFileInfo", value: function saveFileInfo(
        req, res, next) {
            var that = this;
            that.getData(req, res, next).then(function (qiniu, code, msg) {
                if (!qiniu || qiniu.length == 0) {
                    that.saveInfo(req, res, next);
                } else
                {
                    that.updateInfo(req, res, next, qiniu[0]._id);
                }
                res.send({ code: errorStatus.SUCCESS_CODE, msg: errorStatus.SUCCESS_MSG });
            });
        }
        /*更新数据*/ }, { key: "updateInfo", value: function updateInfo(
        req, res, next, id) {
            if (id) {
                //更新数据
                var condition = { _id: id };
                var param = {
                    accessKey: req.body.accessKey,
                    secretKey: req.body.secretKey,
                    scope: req.body.scope,
                    deadline: req.body.deadline };

                _Qiniu2.default.update(condition, param, { upsert: true }, function (err) {
                    /*if(err){
                                                                                             }*/

                });
            }
        }
        /*保存数据*/ }, { key: "saveInfo", value: function saveInfo(
        req, res, next) {
            var qiuniu = new _Qiniu2.default({
                accessKey: req.body.accessKey,
                secretKey: req.body.secretKey,
                scope: req.body.scope,
                deadline: req.body.deadline });

            qiuniu.save(function (err) {
                if (err) {
                    res.send({ code: errorStatus.Fail_CODE, msg: errorStatus.Fail_MSG });
                } else
                {
                    res.send({ code: errorStatus.SUCCESS_CODE, msg: errorStatus.SUCCESS_MSG });
                }
            });
        } }]);return Qiniu;}();exports.default =


new Qiniu();