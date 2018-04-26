"use strict";Object.defineProperty(exports, "__esModule", { value: true });

var mongoose = require("../mongodb/db.js");
var Schema = mongoose.Schema;

var demoSchema = new Schema({
    demoTitle: String,
    demoDescription: String,
    create_time: String,
    demoLink: String,
    demoImages: Array,
    author: { type: Schema.Types.ObjectId, ref: "Admin" },
    codeUrl: String });


var Demo = mongoose.model("Demo", demoSchema);exports.default =

Demo;