'use strict';

var mongoose = require('../mongodb/db.js');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	id: String,
	title: String,
	content: String,
	type: { type: Schema.Types.ObjectId, ref: 'ArticleType' },
	create_time: String,
	author:String,
	keywords:String,
	readAmount:{type: Number, default: 0},
	praiseNumber:{type: Number, default: 0}
})

var Article = mongoose.model('Article', articleSchema);

export default Article
