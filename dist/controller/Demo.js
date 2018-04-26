"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _Demo = require("../models/Demo");var _Demo2 = _interopRequireDefault(_Demo);
var _common = require("../controller/common");var _common2 = _interopRequireDefault(_common);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Demo = function () {
    function Demo() {_classCallCheck(this, Demo);
        this.getDemoData = this.getDemoData.bind(this);
        this.deleteDemo = this.deleteDemo.bind(this);
        this.getDemoMore = this.getDemoMore.bind(this);
        this.addDemo = this.addDemo.bind(this);
        this.updateDemo = this.updateDemo.bind(this);
        this.updateAndSave = this.updateAndSave.bind(this);
    }

    //搜索数据  _id和title
    _createClass(Demo, [{ key: "getDemoData", value: function getDemoData(req, res, next) {
            var id = "";
            if (req.query.demoId) {
                id = req.query.demoId;
            } else
            if (req.body.demoId) {
                id = req.query.demoId;
            } else
            {
                id = req.params.demoId;
            }

            var title = req.body.title;
            var page = req.body.page ? req.body.page - 1 : 0;
            var limit = req.body.limit ? req.body.limit : 5;
            var selectParam = {};
            if (id) {
                selectParam._id = id;
            }
            if (title) {
                selectParam.demoTitle = title;
            }

            //获取分页数据
            var status = "1";
            var msg = "数据查询失败";
            var demoData = [];
            return new Promise(function (resolve, reject) {
                _Demo2.default.find(selectParam).skip(page * limit).limit(parseInt(limit)).sort({ "create_time": "desc" }).populate(["author"]).exec(function (err, data) {
                    if (err) {
                        reject();
                    } else
                    {
                        data.forEach(function (item) {
                            var time = new Date(parseInt(item.create_time));
                            item.create_time = _common2.default.getTimeStr(time);

                            var itemNew = {
                                author: {
                                    nickName: item.author.nickName,
                                    avatar: item.author.avatar },

                                demoImages: item.demoImages,
                                demoTitle: item.demoTitle,
                                create_time: item.create_time,
                                demoDescription: item.demoDescription,
                                demoLink: item.demoLink,
                                codeUrl: item.codeUrl,
                                _id: item._id };

                            demoData.push(itemNew);
                        });
                        msg = "成功";
                        status = "0";
                        resolve(demoData, status, msg);
                    }
                });
            });
        } }, { key: "getDemoMore", value: function getDemoMore(

        req, res, next) {
            var that = this;
            that.getDemoData(req, res, next).then(function (demo, code, msg) {
                res.send({ code: code, msg: msg, demo: demo });
            });
        }

        /*删除*/ }, { key: "deleteDemo", value: function deleteDemo(
        req, res) {
            _Demo2.default.remove({ "_id": req.body.demoId }, function (err) {
                if (err) {
                    res.send({
                        code: "1",
                        msg: err });

                } else
                {
                    res.send({
                        code: "0",
                        msg: "删除成功" });

                }
            });
        }
        //更新或保存
    }, { key: "updateAndSave", value: function updateAndSave(req, res, next) {
            var that = this;
            var code = "0";
            var msg = "成功";
            if (!req.body.demoId) {
                that.addDemo(req, res, next);
                res.send({ code: code, msg: msg });
            } else
            {
                that.getDemoData(req, res, next).then(function (data, code, msg) {
                    if (!data || data.length <= 0) {
                        that.addDemo(req, res, next);
                    } else
                    {
                        var condition = { _id: req.body.demoId };
                        var param = {
                            demoTitle: req.body.titleAdd,
                            demoDescription: req.body.descriptionAdd,
                            demoLink: req.body.demoLinkAdd,
                            demoImages: req.body.demoImagesAdd,
                            codeUrl: req.body.codeUrlAdd };

                        that.updateDemo(condition, param);
                    }
                    res.send({ code: code, msg: msg });
                });
            }
        } }, { key: "addDemo", value: function addDemo(

        req, res, next) {
            try {
                var article = new _Demo2.default({
                    demoTitle: req.body.titleAdd,
                    demoDescription: req.body.descriptionAdd,
                    demoLink: req.body.demoLinkAdd,
                    demoImages: req.body.demoImagesAdd,
                    codeUrl: req.body.codeUrlAdd,
                    create_time: new Date().getTime(),
                    author: req.api_user.id });

                article.save(function (err) {
                    if (err) {
                        throw err;
                    }
                });
            } catch (e) {
                throw e;
            }
        }

        /*更新数据，木有写好*/ }, { key: "updateDemo", value: function updateDemo(
        condition, param) {
            _Demo2.default.update(condition, param, { upsert: true }, function (err, response) {
                if (err) {
                    throw err;
                }
            });
        } }]);return Demo;}();exports.default =


new Demo();