//   Set Location as a property of the socket object    
//   Like this......
//   
//    socket.location = location[0];
//     users.push(socket.location)
//
//    the user hit the check in button, it grabs the location, pushed it to URL, URL emits socket  to server 
//     to check if its valid. Now I can take that location and add it as a socket property just as I added the
//     username as a socket property. Now that its bound to the users socket object it can be checked against
//     the URL so that if the user tries to manipulate it he will be redirected to the location check page.

var express = require('express'),
	app     = express(),
	server = require('http').createServer(app);
	io     = require('socket.io').listen(server),
	fs     = require('fs'),
	path = require("path"),
	url = require('url'),
	http = require('http'),
	mysql  = require('mysql');

	
	    
server.listen(8080);
function handler(req, res) {

fs.readFile(__dirname + '/appclientV5.html',
	function(err, data){
	if(err){
	res.writeHead(500);
	return res.end('Error');
	}
	res.writeHead(200);
	res.end(data);
	});
}

var users = [];
var userTotal = 0;
var mesg;
io.sockets.on('connection', function(socket){

		if((users.length%2)==0 && (users.length > 1)){


			var newdata;
			for(var i =0; i < users.length; i++){
				if(i == (users.length - 1)){
					io.sockets.emit("updt", newdata);
					break;
				} else if (i == 0) {
					var string='';
				var uid1 = users[i];
				var uid2 = users[i + 1];
				newdata = users[uid1].username + " is talking to " + users[uid2].username + 
				" <br> <div id='contnt' style='height:60px;width:350px;overflow-y:auto;position:relative;bottom:0;background-color:#E6E6E6;'></div>";
				io.sockets.emit("updt", newdata);
			} else if(i > 0){
					var uid1 = users[i + 1];
					var uid2 = users[i + 2];
				
				newdata += users[uid1].username + " is talking to " + users[uid2].username + 


				" <br> <div id='contnt' style='height:60px;width:350px;overflow-y:auto;position:relative;bottom:0;background-color:#E6E6E6;'></div>";
				i++;
			}
			
		}
	}
	userTotal = (userTotal + 1);
	console.log(userTotal);
	io.sockets.emit("total", userTotal);
	socket.on('disconnect', function(){
	userTotal = (userTotal - 1);
	console.log(userTotal);
	io.sockets.emit("total", userTotal);

			if(users[socket.user] == null){
		console.log(" -user disconnected- ");
				} else if((users.length%2)==0 && (users.length > 0)) {
					data = users[socket.user].Rid;
					console.log(data);

//tell other user you've disconnected and remove them from active array
					var userdata = users[socket.user].username;
					var message = userdata + " has disconnected ";
						var msgEmitTarget = users.indexOf(data);
						var check = msgEmitTarget%2;
						if(check == 0){
						msgEmitTarget = users.indexOf(data);
						var et = msgEmitTarget + 1;
						var tn = users[et];
					//	if(tn == undefined){}
						users[tn].emit("discon",message);
						var other = users[tn].Rid;
						var index = users.indexOf(other);
						if(index > -1){
						users.splice(index, 1);
					        } 

					// remove yourself from array

							var ind = users.indexOf(data);
							if(ind > -1){
							users.splice(ind, 1);
						}


						} else if(check != 0){
       					 var et = msgEmitTarget - 1;
						var tn = users[et];
						if(tn == undefined){} else {
						users[tn].emit("discon", message);
						var other = users[tn].Rid;
						var index = users.indexOf(other);
						if(index > -1){
						users.splice(index, 1);
					}

					var ind = users.indexOf(data);
							if(ind > -1){
							users.splice(ind, 1);
					 }
					}
				}
					
				} else if((users.length%2)!=0 && (users.length > 1)) {

                     data = users[socket.user].Rid;

//tell other user you've disconnected and remove them from active array
					var userdata = users[socket.user].username;
					var message = userdata + " has disconnected ";
						var msgEmitTarget = users.indexOf(data);
						var check = msgEmitTarget%2;
						if(check == 0){
							
					msgEmitTarget = users.indexOf(data);
						var et = msgEmitTarget + 1;
						var tn = users[et];
						if(tn == undefined){} else {
						users[tn].emit("discon",message);
						var other = users[tn].Rid;
						var index = users.indexOf(other);
						if(index > -1){
						users.splice(index, 1);
					        } 
					    }

					// remove yourself from array

							var ind = users.indexOf(data);
							if(ind > -1){
							users.splice(ind, 1);
						}


						} else if(check != 0){
       					 var et = msgEmitTarget - 1;
						var tn = users[et];
						if(tn == undefined){} else {
						users[tn].emit("discon", message);
						var other = users[tn].Rid;
						var index = users.indexOf(other);
						if(index > -1){
						users.splice(index, 1);
					}
				}
					var ind = users.indexOf(data);
							if(ind > -1){
							users.splice(ind, 1);
					 }	
						}
						else {

							data = users[socket.user].Rid;
							var ind = users.indexOf(data);
							if(ind > -1){
							users.splice(ind, 1);

						}
				      }
			        }
			       if(users[socket.user] != null){
			       data = users[socket.user].Rid;
							var ind = users.indexOf(data);
							if(ind > -1){
							users.splice(ind, 1);

						}
					}

			var newdata;
			if(users.length < 1){
				var blank = "";
				io.sockets.emit("updt", blank);
			} else {
			for(var i =0; i < users.length; i++){
				if(i == (users.length - 1)){
					io.sockets.emit("updt", newdata);
					break;
				} else if (i == 0) {
				var uid1 = users[i];
				var uid2 = users[i + 1];
				
				newdata = users[uid1].username + " is talking to " + users[uid2].username + " <br> <div id='contnt' style='height:60px;width:350px;overflow-y:auto;position:relative;bottom:0;background-color:#E6E6E6;'></div>";
				
			} else if(i > 0){
					var uid1 = users[i + 1];
					var uid2 = users[i + 2];
				
				newdata += users[uid1].username + " is talking to " + users[uid2].username + " <br> <div id='contnt' style='height:60px;width:350px;overflow-y:auto;position:relative;bottom:0;background-color:#E6E6E6;'></div>";
				i++;
			}
			
		}
	}
				});
		
			socket.on('checkurl', function(data){
				var locations = [];
				locations.push("RowanHall");
				locations.push("Sci");
				locations.push("james");
				locations.push("SC");
				locations.push("oak");
				locations.push("EG");
				console.log(data);

				if(locations.indexOf(data) == -1){
					var msg = "invalid url";
					socket.emit('invalid', msg);
				} 

			});

			socket.on("insert", function(u_name, data){
										if((users.length%2)==0 && (users.length > 1)){
											var newdata;
											for(var i =0; i < users.length; i++){
											if(i == (users.length - 1)){
											io.sockets.emit("updt", newdata);
												break;
												} else if (i == 0) {
													var uid1 = users[i];
													var uid2 = users[i + 1];			

newdata = users[uid1].username + " is talking to " + users[uid2].username + " <br> <div id='contnt' style='height:60px;width:350px;overflow-y:auto;position:relative;bottom:0;background-color:#E6E6E6;'><b><font color=blue>"+ users[u_name].username + "</font> : " + data + "</b></div>";
				
											} else if(i > 0){
												var uid1 = users[i + 1];
												var uid2 = users[i + 2];
				
newdata += users[uid1].username + " is talking to " + users[uid2].username + " <br> <div id='contnt' style='height:60px;width:350px;overflow-y:auto;position:relative;bottom:0;background-color:#E6E6E6;'><b><font color=blue>"+  users[u_name].username + "</font> : " + data + "</b></div>";
													i++;
			}
		}
	}



							

			});
socket.on('adduser', function(data, loc){

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^^&*()_+";

    for( var i=0; i < 14; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text; 
}
			var id = makeid();
 			socket.user = id
		 users[socket.user] = socket;
		 socket.Rid = id;
		 socket.username = data;
		 socket.location = loc;
		  users.push(socket.user);

	if((users.length%2)==0 && (users.length > 1)){
			var newdata;
			for(var i =0; i < users.length; i++){
				if(i == (users.length - 1)){
					io.sockets.emit("updt", newdata);
					break;
				} else if (i == 0) {
				var uid1 = users[i];
				var uid2 = users[i + 1];
				
				newdata = users[uid1].username + " is talking to " + users[uid2].username + " <br> <div id='contnt' style='height:60px;width:350px;overflow-y:auto;position:relative;bottom:0;background-color:#E6E6E6;'></div>";
				
			} else if(i > 0){
					var uid1 = users[i + 1];
					var uid2 = users[i + 2];
				
				newdata += users[uid1].username + " is talking to " + users[uid2].username + " <br> <div id='contnt' style='height:60px;width:350px;overflow-y:auto;position:relative;bottom:0;background-color:#E6E6E6;'></div>";
				i++;
			}
		}
	}
	
for(var i=0; i<users.length; i++){
var uid = users[i];

		console.log(users[uid].username);

	}

		
		 console.log("ID : " + users[socket.user].id);
		 socket.emit("success",id,loc,data);
				});
socket.on("randomize", function(data, loc , name){
	
	var size = users.length;
	//console.log(data);
	//console.log(users);
	console.log("array size is: " + size);
	var check = (size%2);
	if(check == 0){
		var emitTarget = users.indexOf(data);
		emitTarget = emitTarget - 1;
		console.log("emit target: " + emitTarget);
		var TargetName = users[emitTarget];
		console.log("target name: " + TargetName)
		if ((TargetName == undefined) || (emitTarget == -1)){

			var ind = users.indexOf(data);
							if(ind > -1){
							users.splice(ind, 1);
						}   
		}
		var actual = users[TargetName].username;
		users[TargetName].emit("joined",  data, loc, name);
		users[data].emit("joined", TargetName, loc, actual);


	}
	else if(check != 0){
		var emitTarget = users.indexOf(data);
		var str = " waiting for users to connect ";
		socket.emit("waiting", str);
		console.log(emitTarget + "  array is odd");
	}
});
socket.on("entermessage", function(msg, data, name){
console.log("sender :" + data + "  message :" + msg);
	var msgEmitTarget = users.indexOf(data);
	var check = msgEmitTarget%2;
	if(check == 0){
		//console.log(data + " is the conv starter");
		var et = msgEmitTarget + 1;
		var tn = users[et];
		users[data].emit("message",msg, name);
		} else if(check != 0){
        //console.log(data + " is a conv joiner");
        var et = msgEmitTarget - 1;
		var tn = users[et];
		users[data].emit("message",msg, name);
		

		}



});

});
//
//
//
//
//
	// ucc code 
//
//
//
//
//
var UCCusers = [];






