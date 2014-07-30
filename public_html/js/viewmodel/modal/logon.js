define(['knockout'], function(ko) {
    return function() {
        var self = this;

        this.username = ko.observable('');

        var logonModal = $('#logonModal');

        this.logoff = function() {
            user.logoff();
            showLoginWindow();
        };
        
        this.logon = function() {
            showLoginWindow();
        };

        this.authenticate = function() {
            chat.registerUser(self.username());
        };

        var showLoginWindow = function() {
            logonModal.modal('show');
        };

        var hideLogonWindow = function() {
            logonModal.modal('hide');
        };
        
        signal.userUpdated.add(hideLogonWindow);
    };
});