define(['knockout', 'jquery'], function(ko, $) {
    return function() {
        this.errorDescription = ko.observable('No information about error');
        this.errorLog = ko.observableArray('');
        
        var modalElement = $('#errorModal');
        
        this.show = function() {
            modalElement.modal('show');
        };
        
        this.hide = function() {
            modalElement.modal('hide');
        };
    };
});

