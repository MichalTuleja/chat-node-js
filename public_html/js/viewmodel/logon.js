
var LogonViewModel = function() {
    var self = this;
    
    this.username = ko.observable('');
    this.room = ko.observable('');
    
    this.logoff = function() {
        showLoginWindow();
    };
    
    this.authenticate = function() {
        var success = function() {
            navbar.username(auth.userData.username);
            navbar.room(auth.userData.room);
            hideLogonWindow();
        };
        
        var fail = function() {
            alert("Logon error.");
        };
        
        var authObj = {
            username: self.username(),
            successCallback: success,
            failureCallback: fail
        };
        
        auth.basicLogon(authObj);
    };
    
    var showLoginWindow = function() {
        $('#logonModal').modal('show');
    };
    
    var hideLogonWindow = function() {
        $('#logonModal').modal('hide');
    };
};
