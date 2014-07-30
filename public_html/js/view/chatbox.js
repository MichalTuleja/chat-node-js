var WindowResizer = function() {
    var self = this;
    
    var msgInput = $('#msgInput');
    var navBar = $('#navBar');
    var msgWindow = $('#msgPanel');
    var msgPanel = $('#msgPanelBody');

    var initialize = function() {
        self.setDimensions();
        $(window).resize(self.setDimensions);
        
        var msgPanelHeight = msgPanel.height();
        
        msgPanel.prepend('<p style="height: ' + msgPanelHeight + 'px"></p>');
    };

    this.setDimensions = function() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        var topBarHeight = navBar.height();
        var bottomBarHeight = msgInput.height();
        
        msgWindow.height(windowHeight - topBarHeight - bottomBarHeight - 100);
        msgPanel.height(msgWindow.height()-12);
        
        self.scrollToBottom();
    };
    
    this.scrollToBottom = function() {
        msgPanel.scrollTop(msgPanel.prop('scrollHeight'));
    };
    
    initialize();
};

define(function() {
    return WindowResizer;
});