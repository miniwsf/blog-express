'use strict';

import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var adminSchema = new Schema({
	userName: String,
	password: String,
	id: String,
	create_time: String,
	admin: {type: String, default: '管理员'},
	status: Number,  //1:普通管理、 2:超级管理员
	//avatar: {type: String, default: 'default.jpg'},
})

var Admin = mongoose.model('Admin', adminSchema);

export default Admin
