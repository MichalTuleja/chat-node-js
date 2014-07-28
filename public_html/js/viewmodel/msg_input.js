var MsgInputViewModel = function() {
    var self = this;
    
    this.message = ko.observable('');
    
    this.send = function() {
        if(chat.send(self.message())) {
            msgWindow.addMsg(auth.userData.username, this.message());
            self.message('');
        }
    };
};