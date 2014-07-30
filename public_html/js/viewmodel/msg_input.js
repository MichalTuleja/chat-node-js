define(['knockout'], function(ko) {
    return function() {
        var self = this;
        var history = [];

        this.message = ko.observable('');

        this.send = function() {
            var msg = self.message();
            
            if(cmdHandler(msg)) {
                if (chat.send(msg)) {
                    self.message('');
                }
            }
            else {
                self.message('');
            }
        };
        
        var cmdHandler = function(msg) {
            var patterns = [
                {cmd: /^\/register$/, args: 2, fn: register},
                {cmd: /^\/disconnect$/, args: 1, fn: disconnect},
                {cmd: /^\/join$/, args: 2, fn: joinRoom},
            ];
            
            var msgArr = msg.split(' ');
            
            for(var i=0; i<patterns.length; i++) {
                var pattern = patterns[i];

                if(pattern.cmd.test(msgArr[0])) {
                    history.push(msg);
                    if(msgArr.length === pattern.args) {
                        pattern.fn(msgArr[1]);
                        return false;
                    }
                    else {
                        console.log('Invalid command syntax.');
                        break;
                    }
                }
            }
            
            return true;
        };

        var register = function(name) {
            console.log('Registering name ' + name + '...');
            chat.registerUser(name);
        };
        
        var disconnect = function() {
            console.log('Disconnecting...');
        };
        
        var joinRoom = function(name) {
            console.log('Joining room ' + name);
            rooms.join(name);
        };
    };
});