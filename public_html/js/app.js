/*
 <script src="js/lib/jquery.min.js"></script>
 <script src="js/lib/bootstrap.min.js"></script>
 <script src="js/lib/knockout.js"></script>
 
 <script src="js/model/auth.js"></script>
 <script src="js/model/chat.js"></script>
 
 <script src="js/viewmodel/logon.js"></script>
 <script src="js/viewmodel/navbar.js"></script>
 <script src="js/viewmodel/msg_input.js"></script>
 <script src="js/viewmodel/msg_window.js"></script>
 <script src="js/viewmodel/user_list.js"></script>
 <script src="js/viewmodel/rooms.js"></script>
 
 <script src="js/view/chatbox.js"></script>
 
 <script src="js/app.js"></script>
 */

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

var errorModal;

var errorHandler = function(msg) {
    requirejs(['jquery'], function($) {
        requirejs(['bootstrap', 'knockout', 'viewmodel/error'], function(bootstrap, ko, ErrorModal) {
            var errorModal = new ErrorModal();
            ko.applyBindings(errorModal, document.getElementById('errorModal'));
            errorModal.errorDescription(msg);
            errorModal.show();
        });
    });
};


/*
 * Model
 */

var auth;
var chat;
var user;
var signal;

requirejs(['jquery', 'model/auth', 'model/chat', 'model/user'], function($, Auth, Chat, User) {
        auth = new Auth();
        chat = new Chat();
    try {

    }
    catch (e) {
        errorHandler('Model error');
    }
}, errorHandler);

requirejs(['signals'], function(Signals) {
    signal = {
        userUpdated: new Signals(),
        msgReceived: new Signals()
    }
});

/*
 * View Model
 */

var logon;
var msgInput;
var msgWindow;
var navbar;
var userlist;
var roomsModal;


requirejs(['knockout', 'jquery', 'bootstrap',
    'viewmodel/logon', 'viewmodel/msg_input', 'viewmodel/msg_window',
    'viewmodel/navbar', 'viewmodel/user_list', 'viewmodel/rooms'],
        function(ko, $, bootstrap,
                LogonViewModel, MsgInputViewModel, MsgWindowViewModel,
                NavbarViewModel, UserListViewModel, RoomsModalViewModel) {

            logon = new LogonViewModel();
            msgInput = new MsgInputViewModel();
            msgWindow = new MsgWindowViewModel();
            navbar = new NavbarViewModel();
            userlist = new UserListViewModel();
            roomsModal = new RoomsModalViewModel();

            ko.applyBindings(logon, document.getElementById('logonModal'));
            ko.applyBindings(msgInput, document.getElementById('msgInput'));
            ko.applyBindings(msgWindow, document.getElementById('msgWindow'));
            ko.applyBindings(navbar, document.getElementById('navbar'));
            ko.applyBindings(userlist, document.getElementById('userlist'));
            ko.applyBindings(roomsModal, document.getElementById('roomsModal'));
        });
