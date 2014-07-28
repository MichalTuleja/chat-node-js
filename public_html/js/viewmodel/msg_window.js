var MsgWindowViewModel = function() {
    var self = this;

    this.messages = ko.observableArray();

    var msgObjArr = [
        {user: 'User1', time: new Date(), msg: 'Hello1!'},
        {user: 'User2', time: new Date(), msg: 'Hello2!'},
        {user: 'User3', time: new Date(), msg: 'Hello3!'},
        {user: 'User4', time: new Date(), msg: 'Hello4!'}
    ];

    var initialize = function() {
        for (k = 0; k < 10; k++) {
            for (var i = 0; i < msgObjArr.length; i++) {
                self.addMsg(msgObjArr[i].user, msgObjArr[i].msg);
            }
        }
    };

    this.addMsg = function(user, msg) {
        var date = new Date();
        self.messages.push({user: user, time: date, formattedTime: formatDate(date), msg: msg});
    };

    this.receive = function(message) {
        self.addMsg("Some user", message);
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