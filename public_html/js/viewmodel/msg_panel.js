define(['knockout', 'view/chatbox'], function(ko, WindowResizer) {
    return function() {
        var self = this;

        this.messages = ko.observableArray();
        
        var windowResizer = new WindowResizer();

        var msgObjArr = [];
/*
        var msgObjArr = [
            {user: 'User1', time: new Date(), msg: 'Hello1!'},
            {user: 'User2', time: new Date(), msg: 'Hello2!'},
            {user: 'User3', time: new Date(), msg: 'Hello3!'},
            {user: 'User4', time: new Date(), msg: 'Hello4!'}
        ];
*/
        var initialize = function() {
            self.addMsg('System', 'Welcome to the chat application!');

            signal.msgReceived.add(msgReceived);

            for (k = 0; k < 1; k++) {
                for (var i = 0; i < msgObjArr.length; i++) {
                    self.addMsg(msgObjArr[i].user, msgObjArr[i].msg);
                }
            }

            setTimeout(self.scrollToBottom, 100);
        };

        this.addMsg = function(user, msg) {
            var date = new Date();
            self.messages.push({msg: true, user: user, time: date, formattedTime: formatDate(date), msg: msg});
            windowResizer.scrollToBottom();
        };

        var msgReceived = function(msgData) {
            try {
                msgData = JSON.parse(msgData);
            } catch(e) {
                console.log('Warning: incoming message is not in JSON format.');
            }
            
            try {
                if(typeof msgData === 'object') {
                    var user = msgData.user.name;
                    var msg = msgData.msg.text;
                    self.addMsg(user, msg);
                }
                else if(typeof msgData === 'string') {
                    self.addMsg('System', msgData);
                }                
            } catch(e) {
                console.log('Broken message received.');
            }
        };

        var formatDate = function(date) {
            if (date.getMinutes().toString().length === 1) {
                var min = "0" + date.getMinutes();
            }
            else {
                var min = date.getMinutes();
            }
            return date.getHours() + ':' + min;
        };

        initialize();
    };
    ;
});