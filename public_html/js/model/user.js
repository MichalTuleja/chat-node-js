define([], function(){
    return function() {
        var self = this;
        
        this.user = {
            id: 0,
            name: '',
            status: ''
        };
        
        this.load = function() {
            try {
                self.userData = JSON.parse(localStorage.getItem('userdata'));
            }
            catch(e) {
                console.log('No data for current user');
            }
        };
        
        this.save = function() {
            localStorage.setItem('userdata', JSON.stringify(self.userdata));
        };
        
        this.clear = function() {
            localStorage.clear();
        }
        
        this.load();
    };
});