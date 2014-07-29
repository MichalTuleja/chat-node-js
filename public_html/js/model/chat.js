define(['io'], function(io) {
    return function() {
        var socket = io();

        this.send = function(msg) {
            socket.emit('msg', msg);
            return true;
        };

        this.registerRoom = function() {

        };

        this.joinRoom = function() {

        };

        this.requestRoomsList = function(cb) {

        };

        this.registerUser = function(username) {
            socket.emit('username', username);
        };
        
        this.setDescription = function(description) {
            socket.emit('description', description);
        };

        socket.on('msg', function(msg) {
            console.log('Mesage arrived: ' + msg);
            signal.msgReceived.dispatch(msg);
        });
        
        socket.on('user', function(rcvData) {
            user.data(rcvData);
            
            signal.userUpdated.dispatch();
        });
    };
});
