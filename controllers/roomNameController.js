var ObjectId = require('mongodb').ObjectId;

var roomNameController = function(RoomName){
	var post = function(req, res){
		var roomName = new RoomName(req.body);
		console.log(roomName);
		console.log(req.body.roomName);
		var name = req.body.roomName;

		collRoomNames.find({roomName: name}).toArray(function(err, roomNames){
			if (err) {
				res.status(500).send(err);
			}
			else {
				if (roomNames == 0) {
					collRoomNames.save(roomName);
					res.send({success: true});
				}else{
					res.send({success: false});
				}
			}
		});
	}

	var get = function(req, res){
		var query = req.query;
		collRoomNames.find(query).toArray(function(err, roomNames){
			if (err) {
				res.status(500).send(err);
			}
			else {
    			var returnRooms = [];
    			roomNames.forEach(function(element){
    				var newRoom = element;
    				newRoom.links = {};
    				newRoom.links.this = 'http://' + req.headers.host + '/api/roomNames/' + newRoom._id;
    				returnRooms.push(newRoom);
    			});
    			res.send(returnRooms);
    			returnRooms.sort();
			}
		});
	}

	var getId = function(req, res){
		var id = req.params.id;
		console.log(id);
		var o_id = new ObjectId(id);
		console.log(o_id);
		collRoomNames.find(o_id).toArray(function(err, roomNames){
			if (err) {
				res.status(500).send(err);
			}
			else {
    			console.log("retrieved record:");
    			console.log(roomNames);
    			res.send(roomNames);
    		}
		});
	}

	var putId = function(req, res){
		var room = new RoomName(req.body);
		collRoomNames.save(room);
		res.status(201).send(room);
	}

	var deleteId = function(req, res){ 
    	var id = req.params.id;
    	collRoomNames.remove({_id  : ObjectId(id)},
    	function(err, result){
    		if (err) {res.status(500).send(err);}
    		else{
    			res.status(204).send('Deleted');
    		};
    	});
	}

	return {
		post: post,
		get: get,
		getId: getId,
		putId: putId,
		deleteId: deleteId
	}
}

module.exports = roomNameController;