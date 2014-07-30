define(['jquery'], function($) {
    return function() {
        var self = this;
        
        var data = [];
        
        this.join = function(name) {
            var room = rooms.findByName(name);
            
            if(room !== null) {
                chat.joinRoom(room.id, room.name);
            }
            else {
                msgWindow.addMsg('System', 'There is no room with a given name: ' + name);
            }
        };
        
        this.getData = function() {
            return data;
        };
        
        this.updateList = function(newData) {
            data = newData;
        };
        
        this.findByName = function(name) {
            var rooms = data;
            for(var i=0; i<rooms.length; i++) {
                var room = rooms[i];
                        
                if(room.name === name) {
                    return room;
                }
            }
            
            return null;
        };
    };
});