var utilities = require('./utilities.js');
var fs = require('fs');

exports.serveIndex = function(request, response) {
  console.log('NAVIGATING CLIENT.SERVEINDEX');
  fs.readFile('./index.html', "utf8",function(err, html) {
    console.log("INITIAL REQUEST FOR:", html);
    utilities.sendResponse(response, 200, 'text/html', html);
  });
};

exports.serveDependencies = function(request, response) {
  console.log('NAVIGATING CLIENT.SERVEDEPENDENCIES');
  //HTML
  if (request.url.indexOf(".html") !== -1) {
    console.log("THE REQUEST URL", request.url);
    fs.readFile("."+request.url, "utf8", function(err, html) {
      console.log("CLIENT HTML REQUEST FOR:", html);
      utilities.sendResponse(response, 200, 'text/html', html);
    });
  //CSS
  } else if (request.url.indexOf(".css") !== -1) {
    console.log("THE REQUEST URL", request.url);
    fs.readFile("."+request.url, "utf8", function(err, css) {
      console.log("CLIENT CSS REQUEST FOR:", css);
      utilities.sendResponse(response, 200, 'text/css', css);
    });
  //JavaScript
  } else if (request.url.indexOf(".js") !== -1) {
    console.log("THE REQUEST URL", request.url);
    fs.readFile("."+request.url, "utf8", function(err, js) {
      console.log("CLIENT JS REQUEST FOR:", js);
      utilities.sendResponse(response, 200, 'text/javascript', js);
    });
  //PNG
  } else if (request.url.indexOf(".png") !== -1) {
    console.log("THE REQUEST URL", request.url);
    fs.readFile("."+request.url, function(err, png) { // encoding?
      console.log("CLIENT PNG REQUEST FOR:", png);
      utilities.sendResponse(response, 200, 'image/png', png);
    });
  //OTHER
  } else {
    console.log(request.url, "NOT FOUND IN CLIENT FOLDER");
    utilities.sendResponse(response, 404, 'text/plain', "NOT FOUND IN CLIENT FOLDER");
  }
};

