"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _Admin = require("../models/Admin");var _Admin2 = _interopRequireDefault(_Admin);
var _ErrorStatus = require("../controller/ErrorStatus");var errorStatus = _interopRequireWildcard(_ErrorStatus);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
var jwt = require("jsonwebtoken");var

Admin = function () {
    function Admin() {_classCallCheck(this, Admin);
        this.login = this.login.bind(this);
        this.getData = this.getData.bind(this);
        this.getPersonal = this.getPersonal.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    /*登录*/_createClass(Admin, [{ key: "login", value: function login(
        req, res, next) {var _ref =
            req.body || {},_ref$username = _ref.username,username = _ref$username === undefined ? null : _ref$username,_ref$password = _ref.password,password = _ref$password === undefined ? null : _ref$password;
            if (!username || !password) {
                res.send({ code: "1003", msg: "请输入用户名或密码" });
                return;
            }
            /*获取加密密码*/
            var encodepsd = null;
            try {
                encodepsd = require("crypto").createHash("md5").update(new Buffer(password, "binary")).digest("hex");
            }
            catch (e) {
                throw e;
            }

            _Admin2.default.find({ userName: username }, function (err, user) {
                if (err)
                throw err;
                if (!user || user.length == 0) {
                    res.send({ code: "1000", message: "认证失败，用户名找不到" });
                } else
                if (user.length > 0) {var _user = _slicedToArray(
                    user, 1),userNew = _user[0];
                    // 检查密码
                    if (userNew.password != encodepsd) {
                        res.send({ code: "1001", message: "认证失败，密码错误" });
                    } else {
                        // 创建token
                        var userToken = {
                            userName: userNew.userName,
                            password: userNew.password,
                            id: userNew._id };

                        var token = jwt.sign(userToken, "app.get(superSecret)", {
                            "expiresIn": 1440 // 设置过期时间
                        });
                        res.cookie("token", token);
                        res.send({
                            code: "0",
                            message: "登录成功" });

                    }
                }
            });
        }
        /*获取登录用户个人信息*/ }, { key: "getPersonal", value: function getPersonal(
        req, res, next) {
            var that = this;
            var id = req.api_user.id; //用户id
            if (!id) {
                res.render("user", { user: {} });
            } else
            {
                that.getData(req, res, next).then(function (data) {var _data = _slicedToArray(
                    data, 1),_data$ = _data[0],user = _data$ === undefined ? {} : _data$;
                    res.send({ code: errorStatus.SUCCESS_CODE, user: user });
                });
            }
        }
        /*获取数据*/ }, { key: "getData", value: function getData(
        req, res, next) {
            var id = req.api_user.id; //用户id
            var selectParam = {};
            if (id) {
                selectParam._id = id;
            }
            return new Promise(function (resolve, reject) {
                _Admin2.default.find(selectParam, function (err, user) {
                    if (err)
                    throw err;else
                    {
                        resolve(user);
                    }
                });
            });
        } }, { key: "saveData", value: function saveData(

        req, res, next) {
            var admin = {
                nickName: req.body.nickName,
                avatar: req.body.avatar };

            var password = req.body.password;
            if (password) {
                var encodepsd = require("crypto").createHash("md5").update(new Buffer(password, "binary")).digest("hex");
                admin.password = encodepsd;
            }
            _Admin2.default.update({ _id: req.body.id }, admin, { upsert: true }, function (err, response) {
                if (err) {
                    throw err;
                } else
                {
                    res.send({ code: "0", msg: "保存成功" });
                }
            });
        } }]);return Admin;}();exports.default =


new Admin();