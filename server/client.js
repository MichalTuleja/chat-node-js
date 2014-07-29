var Client = function(socket) {
	var self = this;
	
	this.id = Client.idCounter++;
	this.name;
	this.activeRooms = [];
	
	this.registered = false;
	this.socket = socket;
};

Client.idCounter = 0;

module.exports = Client;
