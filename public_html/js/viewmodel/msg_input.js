define(['knockout'], function(ko) {
    return function() {
        var self = this;

        this.message = ko.observable('');

        this.send = function() {
            if (chat.send(self.message())) {
                self.message('');
            }
        };
    };
});