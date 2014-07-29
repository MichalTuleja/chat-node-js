define(['io'], function(io) {
    return function() {
        var self = this;
        
        var socket = io();
        var rooms;
        var users;

        this.send = function(msg) {
            socket.emit('msg', msg);
            return true;
        };
        
        this.getRooms = function() {
            return rooms;
        };
        
        this.getUsers = function() {
            return users;
        };

        this.registerRoom = function() {

        };

        this.joinRoom = function(id) {
            socket.emit('joinRoom', JSON.stringify({id: id}));
        };

        this.requestRoomList = function() {
            socket.emit('getRooms', 'list');
        };

        this.requestUserList = function() {
            socket.emit('getUsers', 'list');
        };

        this.registerUser = function(username) {
            socket.emit('register', {name: username});
        };
        
        this.unregiserUser = function() {
            socket.emit('unregister', 'unregister');
        };
        
        this.setDescription = function(description) {
            socket.emit('description', description);
        };

        socket.on('msg', function(msg) {
            console.log('Mesage received: ' + msg);
            signal.msgReceived.dispatch(msg);
        });
        
        socket.on('userdata', function(rcvData) {
            signal.userUpdated.dispatch(JSON.parse(rcvData));
            self.requestRoomList();
        });
        
        socket.on('userlist', function(data) {
            self.users = JSON.parse(data);
            signal.userlistReceived.dispatch();
            console.log('Userlist updated.');
            console.log(dataObj);
        });
        
        socket.on('roomlist', function(data) {
            try {
                self.rooms = JSON.parse(data);
                signal.roomlistReceived.dispatch();
                console.log('Roomlist updated.');
            }
            catch(e) {
                console.log('There was an error during roomlist fetch');
            }
        });
        
        socket.on('joinedroom', function(roomData) {
            try {
                signal.roomJoined.dispatch(JSON.parse(roomData));
                console.log('Room data received.');
            }
            catch(e) {
                console.log('There was an error during roomlist fetch');
            }
        });
    };
});
