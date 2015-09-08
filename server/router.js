var client = require('./client.js');
var api = require('./api.js');
var utilities = require('./utilities.js');

var routes = {
  '^/$': client.serveIndex,
  '^/client/': client.serveDependencies,
  '^/classes/': api.requestHandler
};

exports.requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  for (var key in routes) {
    if (new RegExp(key).test(request.url)) {
      console.log('ROUTING TO: ' + key);
      routes[key](request, response);
      return;
    } 
  } 
  utilities.sendResponse(response, 404, 'text/plain', 'INVALID PATH');
};