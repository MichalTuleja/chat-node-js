/*
 * Base config
 */

requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: 'lib',
        model: 'model',
        viewmodel: 'viewmodel',
        view: 'view',
        jquery: 'lib/jquery.min',
        knockout: 'lib/knockout',
        io: '../socket.io/socket.io',
        signals: 'lib/signals.min',
        bootstrap: 'lib/bootstrap.min'
    }
});


/*
 * Error handling
 */
var coverError = function(msg) {
    requirejs(['jquery'], function($) {
        requirejs(['bootstrap', 'view/error'], function(bootstrap, ErrorModal) {
            var errorModal = new ErrorModal();
            errorModal.display(msg);
        });
    });
};

/*
 * Model
 */

var auth;
var chat;
var user;
var rooms;
var signal;
var userlist;

requirejs(['jquery', 'model/auth', 'model/chat', 'model/rooms', 'model/userlist'], function($, Auth, Chat, Rooms, Userlist) {
        auth = new Auth();
        chat = new Chat();
        rooms = new Rooms();
        userlist = new Userlist();
    try {

    }
    catch (e) {
        coverError('Model error: ' + e.message);
    }
}, coverError);

requirejs(['signals'], function(Signals) {
    signal = {
        userUpdated: new Signals(),
        msgReceived: new Signals(),
        userlistReceived: new Signals(),
        roomlistReceived: new Signals(),
        roomJoined: new Signals(),
        userlistUpdated: new Signals(),
        userHasJoined: new Signals(),
        userHasLeft: new Signals()
    };
});

/*
 * View Model
 */

var logonModal;
var msgInput;
var msgPanel;
var navbar;
var userlistPanel;
var roomsModal;

var roomsModalElement;


requirejs(['knockout', 'jquery', 'bootstrap',
    'viewmodel/modal/logon', 'viewmodel/msg_input', 'viewmodel/msg_panel',
    'viewmodel/navbar', 'viewmodel/user_panel', 'viewmodel/modal/room'],
        function(ko, $, bootstrap,
                LogonViewModel, MsgInputViewModel, MsgPanelViewModel,
                NavbarViewModel, UserlistPanelViewModel, RoomsModalViewModel) {

            logonModal = new LogonViewModel();
            msgInput = new MsgInputViewModel();
            msgPanel = new MsgPanelViewModel();
            navbar = new NavbarViewModel();
            userlistPanel = new UserlistPanelViewModel();
            roomsModal = new RoomsModalViewModel();
            
            roomsModalElement = $('#roomsModal');

            ko.applyBindings(logonModal, document.getElementById('logonModal'));
            ko.applyBindings(msgInput, document.getElementById('msgInput'));
            ko.applyBindings(msgPanel, document.getElementById('msgPanel'));
            ko.applyBindings(navbar, document.getElementById('navbar'));
            ko.applyBindings(userlistPanel, document.getElementById('userlistPanel'));
            ko.applyBindings(roomsModal, document.getElementById('roomsModal'));
            
            runApplication();
        });

var runApplication = function() {
    logonModal.logon();
};