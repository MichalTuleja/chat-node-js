define(['knockout'], function(ko) {
    return function() {
        var self = this;
        
        this.username = ko.observable('Undefined User');
        this.room = ko.observable('Default room');
        
        var logonModal = $('#logonModal');

        this.logoff = function() {
            this.showLoginWindow();
        };

        this.showLoginWindow = function() {
            logonModal.modal('show');
        };

        this.showRoomsWindow = function() {
            roomsModal.show();
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
