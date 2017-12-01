var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var roomModel = new Schema({
	roomName: {
		type: String
	}
});

module.exports=mongoose.model('roomName', roomModel);