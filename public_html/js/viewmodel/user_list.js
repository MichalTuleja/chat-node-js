define(['knockout'], function(ko) {
    return function() {
        this.list = ko.observableArray();

        var listArr = ['User1', 'User2', 'Michal'];

        this.list(listArr);
    };
});
