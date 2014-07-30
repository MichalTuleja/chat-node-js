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
		
		for(clientIdx in clients) {
			var client = clients[clientIdx];
			var msgObj = {user: {id: msg.user_id, name: msg.user_name}, msg: {text: msg.text} }
			client.socket.emit('msg', JSON.stringify(msgObj));
		}
	};
	
	this.registerClient = function(client) {
		this.clients[client.id] = client;
	};
	
	this.unregisterClient = function(client) {
		delete this.clients[client.id];
	};
};

Room.idCounter = 0;

module.exports = Room;
