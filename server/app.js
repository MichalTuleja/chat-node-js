var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var staticPath = '/home/michal/chat-front/public_html';

app.get('/', function(req, res){
  res.sendfile(staticPath + '/' + 'index.html');
});

app.use(express.static(staticPath));

var rooms = {id: 1, name: 'Default', descr: 'Common room for chatting'};

io.on('connection', function(socket){
  console.log('a user connected');
  console.log(socket);
  socket.broadcast.emit('msg', 'hi');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('msg', function(msg){
    console.log('message: ' + msg);
    socket.emit('msg', msg);
    socket.broadcast.emit('msg', msg);
  });
  
  socket.on('register', function(userData) {
	  
  });
  
  socket.on('getRooms', function(){
	 
  });
});

http.listen(30000, function(){
  console.log('listening on *:30000');
});
