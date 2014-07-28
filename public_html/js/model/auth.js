var Auth = function() {
    var self = this;
    
    this.userData = {username: 'Default user', room: 'Default room'};
    
    this.basicLogon = function(authObj) {
        self.userData.username = authObj.username;
        self.userData.room = authObj.room;
        authObj.successCallback();
        
        if(false) {
            authObj.failureCallback();
        }
    };
};