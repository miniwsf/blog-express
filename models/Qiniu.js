"use strict";

let mongoose = require("../mongodb/db.js");
let Schema = mongoose.Schema;

var qiniuSchema = new Schema({
    accessKey: String,
    secretKey: String,
    scope: String,
    deadline:String,
    token:String
});

var Qiniu = mongoose.model("qiniu", qiniuSchema);

export default Qiniu;
