var Client = function(socket) {
	var self = this;
	
	this.id = Client.idCounter++;
	this.name;
	
	
	this.registered = false;
	this.socket = socket;
	
	var activeRooms = [];
	
	this.addActiveRoom = function(room) {
		activeRooms.push(room);
	};
	
	this.unregisterAllRooms = function() {
		for(var i=0; i<activeRooms.length; i++) {
			var room = activeRooms[i];
			
			room.unregisterClient(self);
		}
	};
};

Client.idCounter = 0;

module.exports = Client;
