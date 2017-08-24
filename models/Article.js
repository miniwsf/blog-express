'use strict';

import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var articleSchema = new Schema({
	id: String,
	title: String,
	content: String,
	type: String,
	create_time: String,
	author:String,
	keywords:String
})

var Article = mongoose.model('Article', articleSchema);

export default Article
