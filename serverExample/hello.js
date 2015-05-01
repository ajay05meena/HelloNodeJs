var callback = function(request,response){
	response.writeHead(200);
	response.write("Hello, this is dog.");
	response.end()
};
var http = require('http');
http.createServer(callback).listen(8080);
console.log('Listening on port 8080');


