var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.sendResponse = function(response, statusCode, contentType, data) {
  statusCode = statusCode || 200;
  headers['Content-Type'] = contentType || 'application/json';
  response.writeHead(statusCode, headers);
  response.end(data);
};

exports.collectData = function(request, callback) {
  var body = '';
  request.on('data', function(chunk) {
    body += chunk.toString();
  });
  request.on('end', function() {callback(body);})
};