var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var Connection = require('./core/conn.js');
var RoomPool = require('./core/room_pool.js');

var helpers = require('./core/helpers.js');

var staticDir = '../public_html/';
var staticPath = path.normalize(process.cwd() + '/' + staticDir);

app.get('/', function(req, res){
  res.sendfile(staticPath + '/' + 'index.html');
});

app.use(express.static(staticPath));

var rooms = new RoomPool();
var clients = {};

helpers.initializeRooms(rooms);

console.log(rooms);

io.on('connection', function(socket){
	console.log('Connection estabilished.');
	var conn = new Connection(socket, clients, rooms);
});

var port = process.env.PORT || 30000;
var ip = process.env.IP || "127.0.0.1";

http.listen(port, ip, function(){
  console.log('listening on ' + ip + ':' + port);
});
