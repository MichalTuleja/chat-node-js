define(['model/user'], function(User) {
    return function() {
        var self = this;
        
        var user = new User();

        this.data = { username: user.name,
                      authorized: false };

        this.basicLogon = function(authObj) {
            chat.registerUser(authObj.username);
            
            /*
            var userUpdateHandler = function() {
                if(data.authorized === true) {
                    self.data.username = authObj.username;
                }
                
            };
            
            signal.userUpdated.add(userUpdateHandler);
            */
        };
        
        this.logoff = function() {
            self.data = {};
            user.clear();
        };
    };
});
