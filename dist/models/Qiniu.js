"use strict";Object.defineProperty(exports, "__esModule", { value: true });

var mongoose = require("../mongodb/db.js");
var Schema = mongoose.Schema;

var qiniuSchema = new Schema({
    accessKey: String,
    secretKey: String,
    scope: String,
    deadline: String,
    token: String });


var Qiniu = mongoose.model("qiniu", qiniuSchema);exports.default =

Qiniu;