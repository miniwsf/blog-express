"use strict";Object.defineProperty(exports, "__esModule", { value: true });

var mongoose = require("../mongodb/db.js");
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    userName: String,
    password: String,
    create_time: String,
    admin: { type: String, default: "管理员" },
    status: Number,
    nickName: String,
    avatar: String });


var Admin = mongoose.model("Admin", adminSchema);exports.default =

Admin;