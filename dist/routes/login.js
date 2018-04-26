"use strict";
var _Admin = require("../controller/Admin");var _Admin2 = _interopRequireDefault(_Admin);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.render("login/login", { layout: null });
});
router.post("/", _Admin2.default.login);

module.exports = router;