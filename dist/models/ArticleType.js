"use strict";Object.defineProperty(exports, "__esModule", { value: true });

var mongoose = require("../mongodb/db.js");
var Schema = mongoose.Schema;

var articleTypeSchema = new Schema({
    typeName: String });


var ArticleType = mongoose.model("ArticleType", articleTypeSchema);exports.default =

ArticleType;