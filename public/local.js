// // Start a WebSocket connection with the server using SocketIO
// var socket = io();

// var num = Math.random()*10000
// var obj = {client:"I am the client", rando: num};


// // Send an event named "test" to the server with socket.emit() function
// // and with this event, send the string 'Hi, this is...' as the data
// // // socket.emit('test', 'Hello from the client!');
// socket.emit('test', obj);

// // When the client receives an event named "test",
// socket.on('test', function(data) {
//   // Take whatever data was received and display it in the client console
//   console.log(data);
// });

// document.addEventListener('click', function(event) {
//   console.log(event);

//   obj = {x: event.clientX, y: event.clientY}

//   socket.emit('test', obj);
// });

//   PART TWO 
// // Create a variable for the web page's canvas element, which has id="mycanvas":
// var canvas = document.getElementById('mycanvas');

// // Create a variable to access the two-dimensional canvas drawing functions
// var pen = canvas.getContext('2d');   // this creates an object we arbitrarily call pen
// // you can also call it context. We can set up the .getContext as 3d too

// pen.beginPath();  // Initialize
// pen.moveTo(0,0);  // Choose starting coordinates (top left corner of canvas)
// pen.lineTo(200,500);  // Choose ending coordinates (500 pixels from top, 500 pixels from left)
// pen.lineTo(400,0);
// pen.lineTo(600,500);
// pen.lineTo(800,0);
// pen.lineTo(1000,500);

// pen.moveTo(0,250);
// pen.lineTo(1000,250);
// pen.moveTo(0, 500);
// pen.lineTo(1000, 500);
// pen.stroke();   // Draw the line

// PART THREE
// Start a WebSocket connection with the server using SocketIO
var socket = io();

// Create a variable for the web page's canvas element, which has id="mycanvas"
var canvas = document.getElementById('mycanvas');

// Create a variable to access the two-dimensional canvas drawing functions
var pen = canvas.getContext('2d');

// Set event listeners for when the mouse button is pressed down, when the mouse moves, and when the mouse button is released
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawStuff);
canvas.addEventListener('mouseup', stopDrawing);

// function startDrawing(event) {
//   console.log("START: " + event.clientX + ", " + event.clientY);

//   // Which canvas drawing functions should go here??
//   // HINT: start with pen.beginPath();
//   pen.beginPath();
//   pen.moveTo(event.clientX, event.clientY);
// }

// function drawStuff(event) {
//   console.log("Moved to: " + event.clientX + ", " + event.clientY);

//   // Which canvas drawing functions should go here?? (or none at all?)
//   pen.lineTo(event.clientX, event.clientY);
//   // pen.stroke();
// }

// function stopDrawing(event) {
//   console.log("STOP: " + event.clientX + ", " + event.clientY);

//   // Which canvas drawing functions should go here?? (or none at all?)
//   pen.stroke();
// }

// PART FOUR
// for Drawing by client
var isDrawing = false;

function startDrawing(event) {
  console.log("START: " + event.clientX + ", " + event.clientY);
  isDrawing = true;
  pen.beginPath();
  pen.moveTo(event.clientX, event.clientY );
  // note JavaScript same function name 'mousedown' - doesnt HAVE to match JS
  // just 
  socket.emit('mousedown', {x: event.clientX, y: event.clientY}); 
}

// for Drawing by Client
function drawStuff(event) {
  console.log("Moved to: " + event.clientX + ", " + event.clientY);
  if (isDrawing) {
    pen.lineTo(event.clientX, event.clientY);
    pen.stroke();
    socket.emit('mousemove', {x: event.clientX, y: event.clientY});
  }
}

function stopDrawing(event) {
  console.log("STOP: " + event.clientX + ", " + event.clientY);

  // Which canvas drawing functions should go here?? (or none at all?)
  pen.stroke();
}

// to receive the client data and draw it on the canvas
// Add this to the bottom of your local.js file:
socket.on('mousedown', function(data) {
  pen.beginPath();
  pen.moveTo(data.x, data.y);
});

socket.on('mousemove', function(data) {
  pen.lineTo(data.x, data.y);
  pen.stroke();
});

