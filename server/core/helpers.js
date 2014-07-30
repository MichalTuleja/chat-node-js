var Room = require('./room.js');

var helpers = {};

helpers.initializeRooms = function(rooms) {
	var room = new Room();
	room.name = 'Default';
	room.description = 'Room for random people';
	rooms[room.id] = room;

	var room = new Room();
	room.name = 'Alternaive';
	room.description = 'Room for freaks';
	rooms[room.id] = room;
};

module.exports = helpers;
