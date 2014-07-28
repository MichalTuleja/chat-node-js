var ErrorModalViewModel = function() {
    this.errorDescription = ko.observable('No information about error');
    this.errorLog = ko.observableArray('');
    this.visible = ko.observable(false);
    
    this.visible(true);
    
    
};

