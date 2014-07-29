define(['knockout'], function(ko) {
    return function() {
        var self = this;
        
        this.username = ko.observable('Undefined User');
        this.room = ko.observable('Default room');
        
        var logonModal = $('#logonModal');
        var roomsModal = $('#roomsModal');

        this.logoff = function() {
            showLoginWindow();
        };

        var showLoginWindow = function() {
            logonModal.modal('show');
        };

        this.showRoomsWindow = function() {
            roomsModal.modal('show');
        };
        
        var updateUserName = function(user) {
            self.username(user.name);
        };

        var updateRoomName = function(room) {
            self.room(room.name);
        };
        
        signal.userUpdated.add(updateUserName);
        signal.roomJoined.add(updateRoomName);
    };
});
