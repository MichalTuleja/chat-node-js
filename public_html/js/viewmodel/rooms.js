define(['knockout'], function(ko) {
    return function() {
        var self = this;

        this.roomName = ko.observable('');
        this.rooms = ko.observableArray([]);

        this.rooms([{name: 'Room1', descr: 'This is a room 1'}, 
                    {name: 'Room2', descr: 'This is a room 2'}]);

        this.joinRoom = function() {
            
            var id = self.findByName(self.roomName());
            
            if(id !== null) {
                chat.joinRoom(id);
            }
            else {
                msgWindow.addMsg('System', 'There is no room with a given name: ' + self.roomName());
            }
        };

        this.findByName = function(name) {
            var rooms = self.rooms();
            for(var i=0; i<rooms.length; i++) {
                var room = rooms[i];
                        
                if(room.name === name) {
                    return room.id;
                }
            }
            
            return null;
        };

        this.setRoomName = function(room) {
            self.roomName(room.name);
        };
        
        var updateRoomList = function() {
            var tmpRooms = [];
            
            for(var i=0; i<chat.rooms.length; i++) {
                var room = chat.rooms[i];
                
                tmpRooms.push({id: room.id, name: room.name, descr: room.description});
            }
            
            self.rooms(tmpRooms);
        };
        
        var updateRoomName = function() {
            navbar.room(self.roomName());
            $('#roomsModal').modal('hide');            
        };
        
        signal.roomlistReceived.add(updateRoomList);
        signal.roomJoined.add(updateRoomName);
    };
});
