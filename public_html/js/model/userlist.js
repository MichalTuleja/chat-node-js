define([], function(){
    return function() {
        var self = this;
        
        var data = {};
        
        var userlistRcvHandler = function(userList) {
            //"[{"id":1,"name":"michal"}]"
            try {
                for(var i=0; i<userList.length; i++) {
                    var user = userList[i];
                    add(user);
                }
            } catch(e) {
                console.log('There is an error in user list object.');
            }
            
            signal.userlistUpdated.dispatch(data);
        };
        
        var add = function(user) {
            data[user.id] = {id: user.id, name: user.name};
        };
        
        var remove = function(user) {
            delete data[user.id];
        };
        
        var addHandler = function(user) {
            add(user);
            signal.userlistUpdated.dispatch(data);
        };
        
        var removeHandler = function(user) {
            remove(user);
            signal.userlistUpdated.dispatch(data);
        };
        
        signal.userlistReceived.add(userlistRcvHandler);
        signal.userJoinedRoom.add(addHandler);
        signal.userLeftRoom.add(removeHandler);
    };
});