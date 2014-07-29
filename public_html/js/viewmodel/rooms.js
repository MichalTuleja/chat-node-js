define(['knockout'], function(ko) {
    return function() {
        var self = this;

        this.roomName = ko.observable('');
        this.rooms = ko.observableArray([]);

        this.rooms([{name: 'Room1', descr: 'This is a room 1'}, 
                    {name: 'Room2', descr: 'This is a room 2'}]);

        this.changeRoom = function() {
            navbar.room(self.roomName());
            $('#roomsModal').modal('hide');
        };

        this.setRoomName = function(room) {
            self.roomName(room.name);
        };
    };
});
