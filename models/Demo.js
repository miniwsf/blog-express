"use strict";

let mongoose = require("../mongodb/db.js");
let Schema = mongoose.Schema;

var demoSchema = new Schema({
    demoTitle: String,
    demoDescript: String,
    create_time: String,
    demoLink:String
});

var Demo = mongoose.model("Demo", demoSchema);

export default Demo;
