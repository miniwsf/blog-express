"use strict";

let mongoose = require("../mongodb/db.js");
let Schema = mongoose.Schema;

let articleTypeSchema = new Schema({
    typeName: String
});

let ArticleType = mongoose.model("ArticleType", articleTypeSchema);

export default ArticleType;
