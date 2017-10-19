'use strict';

let mongoose = require('../mongodb/db.js');
let Schema = mongoose.Schema;

let adminSchema = new Schema({
	userName: String,
	password: String,
	create_time: String,
	admin: {type: String, default: '管理员'},
	status: Number,
	nickName:String,
	avatar:String
	//_token:String
});

let Admin = mongoose.model('Admin', adminSchema);

export default Admin
