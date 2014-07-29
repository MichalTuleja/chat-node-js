define(['model/user'], function(User) {
    return function() {
        var self = this;
        
        var user = new User();

        this.data = { id: user.id,
                      username: user.name,
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
        
        var updateUserData = function(data) {
            self.data.id = data.id;
            self.data.username = data.name;
            saveToLocal();
        };
        
        var saveToLocal = function() {
            user.data.id = self.data.id;
            user.data.name = self.data.username;
            user.save();            
        };
        
        signal.userUpdated.add(updateUserData);
    };
});
