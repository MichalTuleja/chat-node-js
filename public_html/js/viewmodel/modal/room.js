define(['knockout'], function(ko) {
    return function() {
        var self = this;

        this.roomName = ko.observable('');
        this.rooms = ko.observableArray([]);
        
        this.rooms([{name: 'Room1', descr: 'This is a room 1'}, 
                    {name: 'Room2', descr: 'This is a room 2'}]);

        this.joinRoom = function() {
            var name = self.roomName();
            rooms.join(name);
        };

        this.setRoomName = function(room) {
            self.roomName(room.name);
        };
        
        var updateRoomList = function() {
            var tmpRooms = [];
            
            var roomList = rooms.getData();
            
            for(var i=0; i<roomList.length; i++) {
                var room = roomList[i];
                
                tmpRooms.push({id: room.id, name: room.name, descr: room.description});
            }
            
            self.rooms(tmpRooms);
        };
        
        this.hide = function() {
            roomsModalElement.modal('hide');
        };

        this.show = function() {
            roomsModalElement.modal('show');
        };
        
        var joinedRoomHandler = function(data) {
            self.hide();
        };
        
        signal.roomlistReceived.add(updateRoomList);
        signal.roomJoined.add(joinedRoomHandler);
        signal.userUpdated.add(this.show);
    };
});
