define(['knockout'], function(ko) {
    return function() {
        var self = this;
        
        this.list = ko.observableArray();

        var listArr = [{id: null, name: 'You are not registered in any room.'}];

        var buildList = function(data) {
            var tmpArr = [];
            
            for(userIdx in data) {
                var user = data[userIdx];
                
                tmpArr.push({id: user.id, name: user.name});
            }
            
            self.list(tmpArr);
        };
        
        this.list(listArr);

        signal.userlistUpdated.add(buildList);
    };
});
