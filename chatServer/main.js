var users = {};
var usercount = 0;
var http = require('http'),
    fs = require('fs');
 
var app = http.createServer(function (request, response){
	fs.readFile("client.html", "utf-8", function(err,data){
		if(err){
			response.write("Error");
			return;
		}
		response.writeHead(200, {"Content-Type" : "text/html"});
		response.write(data);
		response.end();
	});
}).listen(8000);
 
var io = require('socket.io').listen(app);
 
io.sockets.on('connection', function(socket) {
    socket.on('message_to_server', function(data) {
        var nam = "guest";
	if (socket.id in users){
		 nam = users[socket.id];
	}
	console.log(nam);
        io.sockets.emit("message_to_client",{ message: data["message"],name: nam});
    });
    socket.on('disconnect', function(){
	if (socket.id in users){
		var nam = users[socket.id]
		usercount = usercount -1;
		io.sockets.emit("user_disconnected",{left : nam});
	}
	});
    socket.on('username_to_client', function(data){
	users[socket.id] = data["name"];
	usercount = usercount + 1;
	if(usercount > 1){
		io.sockets.emit("message_to_client_username",{name:data["name"]});
	}
	});
});



