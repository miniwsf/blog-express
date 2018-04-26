"use strict";
var _Qiniu = require("../controller/Qiniu");var _Qiniu2 = _interopRequireDefault(_Qiniu);
var _checkToken = require("../middlewares/checkToken");var _checkToken2 = _interopRequireDefault(_checkToken);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var express = require("express");
var router = express.Router();

router.get("/", _checkToken2.default, function (req, res) {
    res.render("file/file");
});
router.get("/file", _checkToken2.default, _Qiniu2.default.getFile);
router.get("/token", _checkToken2.default, _Qiniu2.default.getToken);
router.post("/saveFile", _checkToken2.default, _Qiniu2.default.saveFileInfo);

module.exports = router;