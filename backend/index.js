const express = require('express');
var app = express();
var http = require("http").Server(app);


var io = require("socket.io")(http);


app.use(express.static(__dirname+'/public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (value) => {
    io.emit("message", value);
  });


  socket.on("agent_msg", (value) => {
    io.emit("agent_msg", value);
  });


  socket.on("fileUpload", (data)=>{
    console.log("fileYploaded started");
    io.emit("fileUpload", data);
  })


  socket.on("customer_msg", (value) => {
    console.log("customer message received")
    io.emit("customer_msg", value);
  });


  socket.on("info", message=>{
    console.log("started uploading file")
    socket.broadcast.emit("info", message)
  });

  socket.on("agent_status", (value) => {
    console.log("agent status received")
    io.emit("agent_status", value);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(8080, () => {
  console.log("listening on *:8080");
});
