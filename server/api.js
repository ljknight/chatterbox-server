var messages = require("./messages/messages.js");
var utilities = require('./utilities.js');

exports.requestHandler = function(request, response) {
  
  //API requests
  console.log("Navigating API")
    
  //GET
  if (request.method === 'GET') {
    console.log("ATTEMPTING GET");
    responseMessage = JSON.stringify(messages.get());
    utilities.sendResponse(response, 200, "application/json", responseMessage);
  
  //POST
  } else if (request.method === 'POST') {
    console.log("ATTEMPTING POST");    
    utilities.collectData(request, function(message) {
      messages.set(message);
    });
    utilities.sendResponse(response, 201);
  
  //OTHERS
  } else {
    console.log("INVALID COMMAND");
    utilities.sendResponse(response, 404, "text/plain", "INVALID COMMAND");
  }
};