var escapeHTML = function(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var username = 'anonymous';
var rooms = [];
var ourRoom = 'Double L';
var friends = [];

var display = function(user, message) { // creates template for user + message
  if (friends.indexOf(user) === -1) { // check if user exists on friend's list - if yes, add friend class
    $('<div class="message-container"> <div class="add-friend">'+user+'</div>'+': '+message+'</div>').appendTo($('#chats'));
  } else {
    $('<div class="message-container friend"> <div class="add-friend">'+user+'</div>'+': '+message+'</div>').appendTo($('#chats'));
  }
};

var fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://127.0.0.1:3000/messages',
    type: 'GET',
    // data: JSON.stringify(message),
    dataType: 'JSON',
    contentType: 'application/json',
    success: function (data) {
      $('#chats').empty();
      for (var i = 0; i < 20; i++) {
        var room = escapeHTML(data.results[i].roomname); 
        if (rooms.indexOf(room) === -1) { // check if room exists on room list
          $('#room').append('<option value=' + room + '>' + room + '</option>'); // populate room dropdown with room names of all loaded messages
          rooms.push(room);
        }

        if ($('#room').val() === 'common-room') {
          display(escapeHTML(data.results[i].username), escapeHTML(data.results[i].text)); // gets username and text from ajax call, formats with display function
        } else {
          if ($('#room').val() === room) {
            display(escapeHTML(data.results[i].username), escapeHTML(data.results[i].text));
          }
        }
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Error!');
    }
  });
};

var send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://127.0.0.1:3000/messages',
    type: 'POST',
    data: JSON.stringify({
      username: username,
      text: message,
      roomname: ourRoom
    }),
    dataType: 'JSON',
    contentType: 'application/json',
    success: function (data) {
      // console.log('message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Error!');
    }
  });
};

fetch();

$(document).on('click', '.submit-name', function() {
  username = escapeHTML($('.add-username').val());
});

$(document).on('click', '.submit-message', function() {
  send(escapeHTML($('.add-message').val()));
  $('.add-message').val('');
});

$(document).on('click', '.load-chats', function() {
  fetch();
});

$(document).on('change', '#room', function() {
  ourRoom = $('#room').val();
  fetch();
});

$(document).on('click', '.submit-room', function() {
  var room = escapeHTML($('.add-room').val());
  $('.add-room').val('');
  $('#room').append('<option value=' + room + '>' + room + '</option>');
  rooms.push(room);
});

$(document).on('click', '.add-friend', function() {
  friends.push(escapeHTML($(this).text()));
  fetch();
});