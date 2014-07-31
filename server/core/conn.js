var Client = require('./client.js');
var Room = require('./room.js');

var Connection = function(socket, clients, rooms) {
	var client = new Client(socket);
	var room = null;
	
	clients[client.id] = client;
	
	console.log('Client connected, id=' + client.id);
	socket.emit('msg', 'Server connected. Register your name to start conversation.');

	var initialize = function() {
		socket.on('disconnect', disconnect);
		socket.on('register', registerClient);
	};

	var enableEventsForRegisteredUser = function() {
		socket.on('msg', incomingMessage);
		socket.on('getRooms', getRooms);
		socket.on('getUsers', getUsers);
		socket.on('joinRoom', joinRoom);
	};
	
	var quitRoom = function() {
		if(room !== null) {
			room.unregisterClient(client);
		}		
	};
	
	var disconnect = function() {
		console.log('User disconnected.');
		socket.broadcast.emit('msg', 'User ' + client.name + ' disconnected.');
		try {
			quitRoom();
		}
		catch(e) {
			console.log('Error while disconnecting client');
		}
	};
	
	var registerClient = function(userData) {
		console.log(userData);
		client.name = userData.name;
		console.log('User registered as ' + client.name);
		socket.emit('msg', 'Welcome to the chat. User is registered with name ' + client.name);
		socket.broadcast.emit('msg', 'User ' + client.name + ' has joined the chat.');
		enableEventsForRegisteredUser();
		
		var userObj = {id: client.id, name: client.name};
		socket.emit('userdata', JSON.stringify(userObj));
	};
	
	var incomingMessage = function(srcMsg){
		if(room !== null) {
			console.log('message: ' + srcMsg);
			var msg = {
				user_id: client.id,
				user_name: client.name,
				text: srcMsg
			};
			room.send(msg);
		}
	};
	
	var getRooms = function() {
		console.log('User requested the room list.');
		var roomList = [];
		for(var roomIdx in rooms) {
			var room = rooms[roomIdx];
			if(room.public) {
				roomList.push({id: room.id, 
								   name: room.name, 
								   description: room.description});
			}
		}
		socket.emit('roomlist', JSON.stringify(roomList));
	};
	
	var getUsers = function() {
		console.log('User requested for the user list.');
		
		var users = room.clients;
		var userList = [];
		
		for(var userIdx in users) {
			var user = users[userIdx];
			userList.push({id: user.id, name: user.name});
		}
		
		socket.emit('userlist', JSON.stringify(userList));
	};
	
	var joinRoom = function(data) {
		quitRoom();
		
		var consideredRoom = JSON.parse(data);
		
		if(rooms[consideredRoom.id] != null) {
			room = rooms[consideredRoom.id];
			room.registerClient(client);
			client.addActiveRoom(room);
			
			socket.emit('joinedroom', JSON.stringify({id: room.id, 
													  name: room.name, 
													  description: room.description}));
		}
		else {
			socket.emit('joinedroom', null);
		}
	};
	
	initialize();
};

module.exports = Connection;
