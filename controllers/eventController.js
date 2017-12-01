var ObjectId = require('mongodb').ObjectId;

var eventController = function(Event){
	var post = function(req, res){
		var event = new Event(req.body);
		console.log(event);

		collEvents.find({date: req.body.date, start: {$lt: req.body.end}, end: {$gt: req.body.start}}).toArray(function(err, events){
			if (err) {
				res.status(500).send(err);
			}
			else {
				if (events == 0) {
					collEvents.save(event);
					res.send({success: true});
				}else{
					res.send({success: false});
				}
			}
		});

	}
	var get = function(req, res){
		var query = req.query;
		collEvents.find(query).toArray(function(err, events){
			if (err) {
				res.status(500).send(err);
			}
			else {
    			var returnEvents = [];
    			events.forEach(function(element){
    				var newEvent = element;
    				newEvent.links = {};
    				newEvent.links.this = 'http://' + req.headers.host + '/api/events/' + newEvent._id;
    				returnEvents.push(newEvent);
    			});
    			res.send(returnEvents);
			}
			// else {
   //  			console.log("retrieved records:");
   //  			console.log(events);	
   //  			res.send(events);
   //  		}
		});
	}
	var put = function(req, res){
		var event = new Event(req.body);
		var invitedPersons = [];
		invitedPersons = req.body.invites;

		collEvents.find({name: req.body.name, date: req.body.date}).toArray(function(err, event){
			if (err) {
				res.status(500).send(err);
			}
			else {
				console.log(event);
				if (event == undefined || event.length == []) {
					res.send({success: false, message: 'There is no event with this date and name.'});
				}
				else{					
					event[0].invites = invitedPersons;
					collEvents.save(event[0]);
					res.send({success: true, message: 'The user has changed his present status for the event.'});
				}
			}
		});
	}
	var getId = function(req, res){
		var id = req.params.id;
		console.log(id);
		var o_id = new ObjectId(id);
		console.log(o_id);
		collEvents.find(o_id).toArray(function(err, event){
			if (err) {
				res.status(500).send(err);
			}
			else {
    			console.log("retrieved record:");
    			console.log(event);
    			res.send(event);
    		}
		});
	}
	var putId = function(req, res){
		var event = new Event(req.body);
		collEvents.save(event);
		res.status(201).send(event);
	}
	var deleteId = function(req, res){ 
    	var id = req.params.id;
    	collEvents.remove({_id  : ObjectId(id)},
    	function(err, result){
    		if (err) {res.status(500).send(err);}
    		else{
    			res.status(204).send('Deleted');
    		};
    	});
	}
	var patchId = function(req, res){
		var updateObject = req.body; 
    	var id = req.params.id;
    	collEvents.update({_id  : ObjectId(id)}, {$set: updateObject},
    	function(err, result){
    		if (err) {res.status(500).send(err);}
    		else{
    			res.send(result)};	
    	});
	}

	return {
		post: post,
		get: get,
		put: put,
		getId: getId,
		putId: putId,
		deleteId: deleteId,
		patchId: patchId
	}
}

module.exports = eventController;