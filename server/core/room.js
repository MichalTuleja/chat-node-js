var Client = require('./client.js');

var Room = function() {
	var self = this;
	
	this.id = Room.idCounter++;
	this.name;
	this.description;
	this.public = true;
	this.password = null;
	this.clients = {};
	
	this.send = function(msg) {
		var clients = self.clients;
		
		var msgObj = {user: {id: msg.user_id, 
							 name: msg.user_name}, 
					  msg: {text: msg.text} };
		
		sendToAll('msg', msgObj);
	};
	
	this.registerClient = function(client) {
		this.clients[client.id] = client;

		var msgObj = {id: client.id, 
					  name: client.name};
					  
		sendToAll('userJoined', msgObj);
	};
	
	this.unregisterClient = function(client) {
		delete this.clients[client.id];
		
		var msgObj = {id: client.id, 
					  name: client.name};
					  
		sendToAll('userLeft', msgObj);
	};
	
	var sendToAll = function(msgName, msgObj) {
		var clients = self.clients;
		
		for(clientIdx in clients) {
			var client = clients[clientIdx];
			client.socket.emit(msgName, JSON.stringify(msgObj));
		}
	};
};

Room.idCounter = 0;

module.exports = Room;
