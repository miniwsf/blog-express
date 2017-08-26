'use strict';

var mongoose = require('../mongodb/db.js');
var Schema = mongoose.Schema;

var articleTypeSchema = new Schema({
	typeName: String
})

var ArticleType = mongoose.model('ArticleType', articleTypeSchema);

export default ArticleType
