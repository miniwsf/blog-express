'use strict';

var mongoose = require('../mongodb/db.js');
var Schema = mongoose.Schema;

var demoSchema = new Schema({
	demoTitle: String,
	demoDescript: String,
	create_time: String,
	demoLink:String
	//_token:String
});

var Demo = mongoose.model('Demo', demoSchema);

export default Demo
