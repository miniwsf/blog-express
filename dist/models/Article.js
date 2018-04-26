"use strict";Object.defineProperty(exports, "__esModule", { value: true });

var mongoose = require("../mongodb/db.js");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    id: String,
    title: String,
    content: String,
    contentHtml: String,
    type: { type: Schema.Types.ObjectId, ref: "ArticleType" },
    create_time: String,
    author: { type: Schema.Types.ObjectId, ref: "Admin" },
    keywords: String,
    latestTime: String,
    readAmount: { type: Number, default: 0 },
    praiseNumber: { type: Number, default: 0 } });


var Article = mongoose.model("Article", articleSchema);exports.default =

Article;