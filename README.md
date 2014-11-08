onCampus
========

onCampus - location based peer-to-peer random chat app (for Rowan University)

onCampus was the result of my desire to experiment with the event driven non-blocking 
model of programming but more importantly to  build a network application using
bi-direction websockets. The application uses Googles geolocation library to
read the users longitude/latitude and subsequently check if they are in range
of Rowan's Glassboro campus. After it confirms that you are indeed "on campus"
it will connect you with another user for an anonymous "one-on-one" chat. In the
Development folder there are two files, newserv.js and appserv.js,  newserv.js was 
my initial server side prototype in which all of the peritent operations where 
accomplished via a database layer, namely mysql. After running into fatal 
logic errors with futile hope of debugging because of its shear complexity I scraped
newserv.js and began working on a prototype without a database layer. A DB layer was
ultimately unneccesary, the message data wasn't going to be needed after a given conversation
ended anyway so why store it? the only thing that really needed to be tracked was the seperate instances of
user socket objects ( 1 per connecting user ) So in appserv I went with the simple algorithmic philosophy of
storing all socket.io socket objects in a single array on the server side. If the array was of even length then you
know that there is no one waiting to connect so that user effectively becomes a waiting user and is added to the active 
users array while being shown a "waiting for others to connect" screen. This is an obvious nightmare in terms of potential 
future scalibility but it worked for my purposes and that is how the current version operates

