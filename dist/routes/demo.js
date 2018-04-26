"use strict";
var _Demo = require("../controller/Demo");var _Demo2 = _interopRequireDefault(_Demo);
var _checkToken = require("../middlewares/checkToken");var _checkToken2 = _interopRequireDefault(_checkToken);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var express = require("express");
var router = express.Router();

router.get("/", _checkToken2.default, function (req, res) {
    res.render("demo/demo", { layout: "layout" });
});
router.post("/demoData", _Demo2.default.getDemoMore);
router.delete("/", _checkToken2.default, _Demo2.default.deleteDemo);
router.put("/", _checkToken2.default, _Demo2.default.updateDemo);
router.post("/", _checkToken2.default, _Demo2.default.updateAndSave);

module.exports = router;