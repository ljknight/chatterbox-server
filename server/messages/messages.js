// require underscore

//messages .collection = actual array
// var messages = {};
var collection = [{message: 'hello'}];
var lastID = 0;

var getLastID = function() {
  return lastID++;
};

//messages.set > takes in object adds date, object id and pushes to collection

var set = function(chatMessage) {
  chatMessage.createdAt = new Date();
  chatMessage.objectID = getLastID();
  collection.push(chatMessage);
};

//messages.get > returns entire array
var get = function() {
  return collection;
};

//(eventually) messages.sort

//export these methods
exports.get = get;
exports.set = set;

