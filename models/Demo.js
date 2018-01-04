"use strict";

let mongoose = require("../mongodb/db.js");
let Schema = mongoose.Schema;

var demoSchema = new Schema({
    demoTitle: String,
    demoDescription: String,
    create_time: String,
    demoLink:String,
    demoImages:Array,
    author:{ type: Schema.Types.ObjectId, ref: "Admin"},
    codeUrl:String
});

var Demo = mongoose.model("Demo", demoSchema);

export default Demo;
