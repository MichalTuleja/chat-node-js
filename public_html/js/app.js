
var auth = new Auth();
var chat = new ChatModel();


var logon = new LogonViewModel();
var msgInput = new MsgInputViewModel();
var msgWindow = new MsgWindowViewModel();
var navbar = new NavbarViewModel();
var userlist = new UserListViewModel();
var roomsModal = new RoomsModalViewModel();

ko.applyBindings(logon, document.getElementById('logonModal'));
ko.applyBindings(msgInput, document.getElementById('msgInput'));
ko.applyBindings(msgWindow, document.getElementById('msgWindow'));
ko.applyBindings(navbar, document.getElementById('navbar'));
ko.applyBindings(userlist, document.getElementById('userlist'));
ko.applyBindings(roomsModal, document.getElementById('roomsModal'));



