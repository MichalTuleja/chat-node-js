define(['io'], function(io) {
    return function() {
        var self = this;
        
        var socket = io();
        this.users;

        this.send = function(msg) {
            socket.emit('msg', msg);
            return true;
        };
        
        this.getRooms = function() {
            return rooms.getData();
        };
        
        this.getUsers = function() {
            return users;
        };

        this.joinRoom = function(id, name) {
            socket.emit('joinRoom', JSON.stringify({id: id, name: name}));
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
            try {
                var users = JSON.parse(data);
                signal.userlistReceived.dispatch(users);
                console.log('Userlist updated.');
            }
            catch(e) {
                console.log('There was an error during userlist fetch');
            }
        });
        
        socket.on('roomlist', function(data) {
            try {
                rooms.updateList(JSON.parse(data));
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
                self.requestUserList();
                
                console.log('Room data received.');
            }
            catch(e) {
                console.log('There was an error during roomlist fetch');
            }
        });
        
        socket.on('userJoined', function(userData) {
            try {
                var data = JSON.parse(userData);
                signal.userJoinedRoom.dispatch(data);
                console.log('User ' + data.name + ' joined the conversation.');
            }
            catch(e) {
                
            }
        });
        
        socket.on('userLeft', function(userData) {
            try {
                var data = JSON.parse(userData);
                signal.userLeftRoom.dispatch(data);
                console.log('User ' + data.name + ' left the conversation.');
            }
            catch(e) {
                
            }            
        });
        
        socket.on('reconnect_error', function() {
            console.log('Connection error');
            coverError('Connection error');
        });
        
        socket.on('reconnect', function() {
            console.log('Reconnected');
            errorModal.dispose();
        });
    };
});
