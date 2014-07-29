var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('./client.js');
var Room = require('./room.js');

var staticPath = '/home/michal/chat/public_html';

app.get('/', function(req, res){
  res.sendfile(staticPath + '/' + 'index.html');
});

app.use(express.static(staticPath));

var rooms = {};
var clients = {};

var room = new Room();
room.name = 'Default';
room.description = 'Room for random people';
rooms[room.id] = room;

var room = new Room();
room.name = 'Alternaive';
room.description = 'Room for freaks';
rooms[room.id] = room;

console.log(rooms);


io.on('connection', function(socket){
	var client = new Client(socket);
	var room = null;
	
	clients[client.id] = client;
	
	console.log('Client connected, id=' + client.id);
	socket.emit('msg', 'Server connected. Register your name to start conversation.');

	socket.on('disconnect', function(){
		console.log('User disconnected.');
		socket.broadcast.emit('msg', 'User ' + client.name + ' disconnected.');
	});

	socket.on('register', function(userData) {
		console.log(userData);
		client.name = userData.name;
		console.log('User registered as ' + client.name);
		socket.emit('msg', 'Welcome to the chat. User is registered with name ' + client.name);
		socket.broadcast.emit('msg', 'User ' + client.name + ' has joined the chat.');
		enableEventsForRegisteredUser();
		
		var userObj = {id: client.id, name: client.name};
		socket.emit('userdata', JSON.stringify(userObj));
	});

	var enableEventsForRegisteredUser = function() {
		socket.on('msg', function(srcMsg){
			if(room !== null) {
				console.log('message: ' + srcMsg);
				var msg = {
					user_id: client.id,
					user_name: client.name,
					text: srcMsg
				};
				room.send(msg);
			}
		});

		socket.on('getRooms', function() {
			console.log('User is fetching room list.');
			var roomList = [];
			for(var roomIdx in rooms) {
				var room = rooms[roomIdx];
				if(room.public) {
					roomList.push({id: room.id, name: room.name, description: room.description});
				}
			}
			socket.emit('roomlist', JSON.stringify(roomList));
		});
		
		socket.on('getUsers', function() {
			console.log('User is fetching user list.');
			var userList = [];
			for(var userIdx in users) {
				var user = users[userIdx];
				userList.push({id: user.id, name: user.name});
			}
			socket.emit('userlist', JSON.stringify(userList));
		});
		
		socket.on('joinRoom', function(data) {
			var consideredRoom = JSON.parse(data);
			
			if(rooms[consideredRoom.id] != null) {
				room = rooms[consideredRoom.id];
				room.clients[client.id] = client;
				client.activeRooms.push(room);
				
				socket.emit('joinedroom', JSON.stringify({id: room.id, name: room.name, description: room.description}));
			}
			else {
				socket.emit('joinedroom', null);
			}
		});
	};
});

var port = process.env.PORT || 30000;
var ip = process.env.IP || "127.0.0.1";

http.listen(port, ip, function(){
  console.log('listening on ' + ip + ':' + port);
});
