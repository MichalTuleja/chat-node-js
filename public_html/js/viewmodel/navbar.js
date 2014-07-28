var NavbarViewModel = function() {
    this.username = ko.observable('Undefined User');
    this.room = ko.observable('Default room');
    
    this.logoff = function() {
        showLoginWindow();
    };
    
    var showLoginWindow = function() {
        $('#logonModal').modal('show');
    };
    
    this.showRoomsWindow = function() {
        $('#roomsModal').modal('show');
    };
};