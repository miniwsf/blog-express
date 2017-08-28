'use strict';

var mongoose = require('../mongodb/db.js');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
	userName: String,
	password: String,
	create_time: String,
	admin: {type: String, default: '管理员'},
	status: Number  
	//_token:String
})

var Admin = mongoose.model('Admin', adminSchema);

export default Admin
