
var express = require('express'),
	app     = express(),
	server = require('http').createServer(app);
	io     = require('socket.io').listen(server),
	fs     = require('fs'),
	mysql  = require('mysql');

server.listen(8080);
var MemoryStore = express.session.MemoryStore;
  app.use(express.cookieParser());
  app.use(express.session({ secret: "%$%$%S&%#", store: new MemoryStore({ reapInterval:  60000 * 10 })}));
  app.get('/', function(req,res){
      req.session.name = users[socket.username].username;
      res.render(__dirname + '/newclient.html',{user:req.session.name});
                   });

function handler(req, res) {

fs.readFile(__dirname + '/newclient.html',
	function(err, data){
	if(err){
	res.writeHead(500);
	return res.end('Error');
	}
	res.writeHead(200);
	res.end(data);
	});
}

var users = {};

io.sockets.on('connection', function(socket){
	socket.on('disconnect', function(){
//console.log(users[socket.username].username);
console.log(users);
var empty = "";
if(users[socket.username] == null){
	console.log(" -user disconnected- ");
} else  {

var database = 'testmsgs';
var table    = 'conversations';
var client   = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
	});
	client.connect();
	client.query("USE " + database);
	var data = String;
	data = users[socket.username].username;


var db = 'testmsgs';
var tble    = 'conversations';
var clnt   = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
	});
	clnt.connect();
	clnt.query("USE " + db);

clnt.query("DELETE FROM users WHERE user = ?", data,
		function selectCb(err, results){
			if(err){ throw err; }
		});

clnt.query("SELECT usertwo FROM " + tble + " WHERE userone = ?", data,
			function selectCb(err, results){
			if(err){ throw err; }
			if(results.length > 0){
		    var string = '';
		    var strlen = results.length;
		    for(var i = 0; i < strlen; i++){
			var u_two = string + results[i].usertwo;
			console.log(u_two);

			 }
			 var message1 = data + " has disconnected...";
			 var empty = '';
			 var newstat = 1;
			 if((u_two)==(empty)){
			 	clnt.query("DELETE FROM " + tble + " WHERE userone = ?", data,
			 		function selectCb(err, results){
						if(err){ throw err; }
							});

			 } else {
			 	users[u_two].emit('discon', message1);
var action = 1;

clnt.query("UPDATE conversations SET action = ? WHERE userone = ?",[action,data],
	function(err, results){
						if(err){ throw err }
					});






			 }
			 	client.query("UPDATE conversations SET status = ? WHERE userone = ?",[newstat,data],
						function(err, results){
						if(err){ throw err }
							client.query("UPDATE conversations SET userone = ? WHERE usertwo= ?", [empty, u_two],
										function(err, results){
						if(err){ throw err }
					          });
					});
						
		   } else {

			clnt.query("SELECT userone FROM " + tble + " WHERE usertwo = ?",data,
			function selectCb(err, results){
			if(err){ throw err; }
		    var string = '';
		    var strlen = results.length;
		    for(var i = 0; i < strlen; i++){
			var u_one= string + results[i].userone;
			console.log(u_one);
		}
			var message2 = data + " has disconnected...";
			var empty = '';
			 var newstat = 1;
			 if((u_one)==(empty)){
			 		clnt.query("DELETE FROM " + tble + " WHERE usertwo = ?", data,
			 		function selectCb(err, results){
						if(err){ throw err; }
							});

			 } else {
			users[u_one].emit('discon', message2);
var action = 1;

clnt.query("UPDATE conversations SET action = ? WHERE usertwo = ?",[action,data],
	function(err, results){
						if(err){ throw err }
					});



				}

			client.query("UPDATE conversations SET status = ? WHERE usertwo = ?",[newstat,data],
						function(err, results){
						if(err){ throw err }
							client.query("UPDATE conversations SET usertwo = ? WHERE userone= ?", [empty, u_one],
										function(err, results){
						if(err){ throw err }
					          });
					});

			
		});
		}
			});


}

});
socket.on('senduser', function(data){

var database = 'testmsgs';
var table    = 'users';
var client   = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
	});
	client.connect();
	client.query("USE " + database);
	var newdata = {
		user: data
	};
		client.query("SELECT * FROM " + table + " WHERE user = ?" ,data,
			function selectCb(err, results){
			if(err){ throw err; }
			if(results.length == 0){
				client.query("USE " + database);
				var userdata = {
					user: data
					};
				client.query("INSERT INTO users SET ?", userdata,
					function(err, results){
						if(err){ throw err }
							socket.emit('success', data);
						 socket.username = data;
						 users[socket.username] = socket;
						 //console.log(users);
							});
			           } else {
				var string = "::choose another username::"
				socket.emit("error", string);
			}

	});

});

socket.on('wait', function(data){

var database = 'testmsgs';
var table    = 'conversations';
var client   = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
	});
	client.connect();
	client.query("USE " + database);
	var newdata = {
		user: data
	};
	console.log("waiting");
	
client.query("SELECT userone FROM " + table + " WHERE status = '2'",
			function selectCb(err, results){
			if(err){ throw err; }
		    var string = '';
		    var strlen = results.length;
		    for(var i = 0; i < strlen; i++){
			var u_one = string + results[i].userone;
		}

			client.query("SELECT usertwo FROM " + table + " WHERE status = '2'",
			function selectCb(err, results){
			if(err){ throw err; }
		    var string = '';
		    var strlen = results.length;
		    for(var i = 0; i < strlen; i++){
			var u_two= string + results[i].usertwo;
		}

			
			if((u_one == data)||(u_two == data)){
			var string = u_one + " is now talking to " + u_two + "<br>";
    	    socket.emit("complete", string);

			}

			else { 
				client.query("SELECT * FROM " + table + " WHERE status = '1'",
					function selectCb(err, results){
					if(err){ throw err; }
					var str = '';
					var strlen = results.length;
					for(var i = 0; i < strlen; i++){

						var action = str + results[i].action;
						console.log(action);
					}
					if((results.length > 0) && (action == 1)){
						client.query("USE " + database);
						var userdata = {
						userone: data
							};
						var stat = 1;
						client.query("INSERT INTO conversations SET ?", userdata,
						function(err, results){
						if(err){ throw err }
							var last = results.insertId;
							client.query("UPDATE conversations SET status = ? WHERE id = ?", [stat, last],
								function(err, results){
						if(err){ throw err }
					          });
						});
						var status = false;
						socket.emit("waiting", status);
					}
						else if(results.length == 0){



								client.query("USE " + database);
						var userdata = {
						userone: data
							};
						var stat = 1;
						client.query("INSERT INTO conversations SET ?", userdata,
						function(err, results){
						if(err){ throw err }
							var last = results.insertId;
							client.query("UPDATE conversations SET status = ? WHERE id = ?", [stat, last],
								function(err, results){
						if(err){ throw err }
					          });
						});
						var status = false;
						socket.emit("waiting", status);





						}
					 else if(results.length > 0) {
						var userdata = {
						usertwo: data
							};
						var oldstat = 1;
						var stat = 2;
						client.query("UPDATE conversations SET usertwo = ? WHERE status = ?",[data,oldstat],
						function(err, results){
						if(err){ throw err }
							client.query("UPDATE conversations SET status = ? WHERE usertwo= ?", [stat, data],
										function(err, results){
						if(err){ throw err }
					          });
						
				client.query("SELECT usertwo FROM " + table + " WHERE userone = ? ", data,
			function selectCb(err, results){
			if(err){ throw err; }
			if(results.length > 0){
		    var string = '';
		    var strlen = results.length;
		    for(var i = 0; i < strlen; i++){
			var u_two = string + results[i].usertwo;
		}
		    var str = " you are now talking to 2" + u_two;
		    console.log(users);
		    users[data].emit("joined", str);
			users[u_two].emit('joined', str);
	} else {

			client.query("SELECT userone FROM " + table + " WHERE usertwo = ? ", data,
			function selectCb(err, results){
			if(err){ throw err; }
		    var string = '';
		    var strlen = results.length;
		    for(var i = 0; i < strlen; i++){
			var u_one = string + results[i].userone;
		}
			var str = " you are now talking to " + u_one;
			var str2 = " you are now talking to " + data;

				console.log(users)
				users[data].emit('joined',str)
			users[u_one].emit('joined', str2);
						});
		}
						});
						});

			      }
		     });
   		 } 

     });
  

  });



});


socket.on('entermessage', function(data,name){
	var database = 'testmsgs';
	var table    = 'messages';
	var client   = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
	});
	client.connect();
	client.query("USE " + database);

client.query("SELECT id FROM conversations WHERE userone = ?", name,
			function selectCb(err, resultsid){
			if(err){ throw err; }
			if(resultsid.length > 0){
		var str= '';
		var strlen = resultsid.length;
		for(var i = 0; i < strlen; i++){

			convId = str + resultsid[i].id;
		}

	}

client.query("SELECT id FROM conversations WHERE usertwo = ?", name,
			function selectCb(err, resultsid){
			if(err){ throw err; }
			if(resultsid.length > 0){}
		var str= '';
		var strlen = resultsid.length;
		for(var i = 0; i < strlen; i++){

			convId = str + resultsid[i].id;

		}
console.log(convId);

	var newdata = {
		message: data
	}; 
	client.query("INSERT INTO messages SET ?", newdata,
			function(err, results){
				if(err){ throw err }
					var last_id = results.insertId;
				client.query("UPDATE messages SET conv_id = ? WHERE id= ?", [convId, last_id],
										function(err, results){
						if(err){ throw err }
					          });
						
					});


		client.query("USE " + database);
		client.query("SELECT message FROM " + table + " ORDER BY(id) DESC LIMIT 1 ",
			function selectCb(err, results){
			if(err){ throw err; }
		var string = '';
		var strlen = results.length;
		for(var i = 0; i < strlen; i++){

			msgstring = string + results[i].message
		}

var db = 'testmsgs';
var tble    = 'conversations';
var clnt   = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
	});
	clnt.connect();
	clnt.query("USE " + db);
	var newdata = {
		user: data
	};

clnt.query("SELECT usertwo FROM " + tble + " WHERE userone = ? ", name,
			function selectCb(err, results){
			if(err){ throw err; }
			if(results.length > 0){
		    var string = '';
		    var strlen = results.length;
		    for(var i = 0; i < strlen; i++){
			var u_two = string + results[i].usertwo;
		}
		
		users[u_two].emit('message',msgstring,name);

	} else {

			clnt.query("SELECT userone FROM " + tble + " WHERE usertwo = ?", name,
			function selectCb(err, results){
			if(err){ throw err; }
		    var string = '';
		    var strlen = results.length;
		    for(var i = 0; i < strlen; i++){
			var u_one = string + results[i].userone;
		}
		
		users[u_one].emit('message',msgstring,name);
			//io.sockets.emit('message', string, name);
					});
		         }
			});

	
       });
    });
  });
});

socket.on('reconnecting', function(data){
var db = 'testmsgs';
var tble    = 'conversations';
var clnt   = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
	});
	clnt.connect();
	clnt.query("USE " + db);



	clnt.query("SELECT id FROM conversations WHERE userone = ?",data,
			function selectCb(err, results){
			if(err){ throw err; }
			if(results.length > 0){
				console.log("result.length > 0")
				 var string = '';
		   		 var strlen = results.length;
		   		 for(var i = 0; i < strlen; i++){
					var id = string + results[i].id;
					console.log(id);
					console.log("hi");
								}

									clnt.query("DELETE FROM messages WHERE conv_id = ?",id,
										function selectCb(err, results){
										if(err){ throw err; }
																		});
									/*
									clnt.query("DELETE FROM users WHERE user = ?",data,
										function selectCb(err, results){
										if(err){ throw err; }
																		});
									*/
									clnt.query("DELETE FROM " + tble + " WHERE userone = ?", data,
										function selectCb(err, results){
										if(err){ throw err; }
									clnt.query("DELETE FROM " + tble + " WHERE usertwo = ?", data,
										function selectCb(err, results){
										if(err){ throw err; }
							
									socket.emit('success', data);
																		});
																		});


							} else if(results.length == 0) {
								console.log("result.length == 0");
								console.log(data);
							clnt.query("SELECT id FROM " + tble + " WHERE usertwo = ?", data,
							function selectCb(err, results){
							if(err){ throw err; }
			
							 var string = '';
		   					 var strlen = results.length;
		   					 for(var i = 0; i < strlen; i++){
								var id = string + results[i].id;
								console.log(id);
								}


clnt.query("DELETE FROM messages WHERE conv_id = ?",id,
		function selectCb(err, results){
			if(err){ throw err; }
		});
/*
clnt.query("DELETE FROM users WHERE user = ?",data,
		function selectCb(err, results){
			if(err){ throw err; }
		});
*/
	
	clnt.query("DELETE FROM " + tble + " WHERE userone = ?", data,
		function selectCb(err, results){
			if(err){ throw err; }
			clnt.query("DELETE FROM " + tble + " WHERE usertwo = ?", data,
				function selectCb(err, results){
			if(err){ throw err; }
							
			socket.emit('success', data);
			});
		});
      });
						} else {

							socket.emit('success', data);
						}
    }); 
  });
});


/*



---DEVELOPMENT NOTES---
Disconnect working both ways, clears userone field and usertwo field without server error
now must delete the actual conversation row in table

-- Also disconnect function must delete from users table (just copy queries from reconnect function).

UPDATE disconnect function now deletes the respective disconnecting user then removes the conversation
		row  if the remaining user leaves.
UPDATE fixed wierd issue of new user overwriting a user who has been disconnect from partner, solved by
		setting action flag.

*/