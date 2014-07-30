var RoomPool = function() {
	var self = this;
	
	this.registerRoom = function(room) {
		this[room.id] = room;
	};
	
	this.unregisterRoom = function(room) {
		delete this[room.id];
	};
};

module.exports = RoomPool;
