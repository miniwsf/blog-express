"use strict";
var jwt = require("jsonwebtoken");

/*登录验证*/
module.exports = function (req, res, next) {
    //检查post的信息或者url查询参数或者头信息
    var token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token;
    // 解析 token
    if (token) {
        // 确认token
        jwt.verify(token, "app.get(superSecret)", function (err, decoded) {
            if (err) {
                var _err = new Error();
                _err.status = 401;
                next(_err);
            } else {
                // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                req.api_user = decoded;
                next();
            }
        });
    } else {
        // 如果没有token，则返回错误
        var err = new Error();
        err.status = 401;
        next(err);
    }
};