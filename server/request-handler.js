/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var messages = require("./messages/messages.js");
// var bodyParser = require("../node_modules/body-parser");
var fs = require('fs');

var requestHandler = function(request, response) {

  //GET
    //return the entirety of messages

  //POST
    //add the data to messages (using messages methods)
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";

  console.log("URL:", request.url);
  //API requests
  if ((/^\/classes\//).test(request.url)) {
    console.log("Navigating API")
    console.log("Serving request type " + request.method + " for url " + request.url);
    
    //GET
    if (request.method === 'GET') {
      console.log("ATTEMPTING GET");
      responseMessage = JSON.stringify(messages.get());
      statusCode = 200;
      headers['Content-Type'] = "application/json";
      response.writeHead(statusCode, headers);
      response.end(responseMessage);
    
    //POST
    } else if (request.method === 'POST') {
      console.log("ATTEMPTING POST");    
      var body = '';
      request.on('data', function(chunk) {
        body += chunk.toString();
      });
      request.on('end', function() {messages.set(body);});
      statusCode = 201;
      // headers['Content-Type'] = "text/plain";
      response.writeHead(statusCode, headers);
      response.end();
    
    //OTHERs
    } else {
      console.log("INVALID COMMAND");
      statusCode = 404;
      response.writeHead(statusCode, headers);
      response.end("INVALID COMMAND");
    }
  //Initial index request
  } else if (request.url === '/'){
    fs.readFile('./index.html', "utf8",function(err, html) {
      console.log("INITIAL REQUEST FOR:", html);
      headers['Content-Type'] = 'text/html';
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(html);
    });
  //Client requests
  } else if ((/^\/client\//).test(request.url)) {
    //html
    if (request.url.indexOf(".html") !== -1) {
      console.log("THE REQEST URL", request.url);
      fs.readFile("."+request.url, "utf8", function(err, html) {
        console.log("CLIENT HTML REQUEST FOR:", html);
        headers['Content-Type'] = 'text/html';
        statusCode = 200;
        response.writeHead(statusCode, headers);
        response.end(html);
      });

    //css
    } else if (request.url.indexOf(".css") !== -1) {
      console.log("THE REQEST URL", request.url);
      fs.readFile("."+request.url, "utf8", function(err, css) {
        console.log("CLIENT CSS REQUEST FOR:", css);
        headers['Content-Type'] = 'text/css';
        statusCode = 200;
        response.writeHead(statusCode, headers);
        response.end(css);
      });
    
    //JS
    } else if (request.url.indexOf(".js") !== -1) {
      console.log("THE REQEST URL", request.url);
      fs.readFile("."+request.url, "utf8", function(err, js) {
        console.log("CLIENT JS REQUEST FOR:", js);
        headers['Content-Type'] = 'text/javascript';
        statusCode = 200;
        response.writeHead(statusCode, headers);
        response.end(js);
      });

    //others
    } else {
      console.log(request.url, "NOT FOUND IN CLIENT FOLDER");
      statusCode = 404;
    }
  

    //read the file at url
    //determine the file type at that url and set the right header
    //set reponse message the the read file


  //anything else
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end(responseMessage);
  }
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
