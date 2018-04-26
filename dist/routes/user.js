"use strict";
var _Admin = require("../controller/Admin");var _Admin2 = _interopRequireDefault(_Admin);
var _checkToken = require("../middlewares/checkToken");var _checkToken2 = _interopRequireDefault(_checkToken);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var express = require("express");
var router = express.Router();

router.get("/personal", _checkToken2.default, _Admin2.default.getPersonal);
router.get("/", _checkToken2.default, function (req, res) {
    res.render("user/user");
});
router.post("/", _checkToken2.default, _Admin2.default.saveData);

module.exports = router;