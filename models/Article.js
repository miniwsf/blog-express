"use strict";

let mongoose = require("../mongodb/db.js");
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    id: String,
    title: String,
    content: String,
    contentHtml:String,
    type: { type: Schema.Types.ObjectId, ref: "ArticleType" },
    create_time: String,
    author:{ type: Schema.Types.ObjectId, ref: "Admin"},
    keywords:String,
    latestTime:String,
    readAmount:{type: Number, default: 0},
    praiseNumber:{type: Number, default: 0}
});

let Article = mongoose.model("Article", articleSchema);

export default Article;
