/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var messages = require("./messages/messages.js");
var bodyParser = require("../node_modules/body-parser");

var requestHandler = function(request, response) {

  //GET
    //return the entirety of messages

  //POST
    //add the data to messages (using messages methods)
  var statusCode;
  var responseMessage = "Responded"

  console.log("URL:", request.url);
  if ((/classes\//).test(request.url)) {
    if (request.method === 'GET') {
      responseMessage = JSON.stringify(messages.get());
      statusCode = 200;
      // console.log(JSON.stringify(messages.get()))
    } else if (request.method === 'POST') {
      console.log("Serving request type " + request.method + " for url " + request.url);    
      var body = '';
      request.on('data', function(chunk) {
        body += chunk.toString();
      });
      request.on('end', function() {messages.set(body);});
      statusCode = 201;
      // console.log(body);
    } else {
      statusCode = 404;
    }
  } else {
    statusCode = 404;
  }
    // The outgoing status.
    
    // See the note below about CORS headers.
    var headers = defaultCorsHeaders;
    response.writeHead(statusCode, headers);
    // Tell the client what type of data we're sending.
    headers['Content-Type'] = "application/json";
    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.

    response.end(responseMessage);
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;
