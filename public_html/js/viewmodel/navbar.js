define(['knockout'], function(ko) {
    return function() {
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
    };
});
