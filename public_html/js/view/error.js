define(['jquery'], function($) {
    return function() {
        this.errorLog = [];
        
        var modalElement = $('#errorModal');
        var descriptionElement = $('#errorDescription');
        
        this.display = function(msg) {
            descriptionElement.text(msg);
            modalElement.modal('show');
        };
        
        this.dispose = function() {
            modalElement.modal('hide');
        };
    };
});

