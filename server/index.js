const http = require( "http");
const express = require("express");
const logger = require( "morgan");
const cors =require("cors");
// const socketio = require("socket.io");
const { Server } = require("socket.io");
require('dotenv').config()



// socket configuration
const WebSockets = require("./utils/WebSockets.js");

// mongo connection
require( "./config/mongo");

// routes
const indexRouter = require( "./routes/index");
const userRouter = require("./routes/user.js");
const { SocketAddress } = require("net");
const chatRoomRouter = require( "./routes/chatRoom.js");
// const deleteRouter = require("./routes/delete.js");
// middlewares
const { decode } = require('./middlewares/jwt.js')

const app = express();



/** Get port = environment and store in Express. */
const port = process.env.PORT || "3000";
// app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
// app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

/** Create HTTP server. */
const httpServer = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
/** Create socket connection */

// global.io = socketio.listen(server);
// global.io.on('connection', WebSockets.connection)

// server.listen(port);

const io = new Server(httpServer,{origin:"*:*"});


global.io = io
global.io.on('connection', WebSockets.connection)

/** Event listener for HTTP server "listening" event. */
httpServer.listen(3000,()=>console.log(`Listening on port:: http://localhost:${port}/`));
// httpServer.on("listening", () => {
//   console.log(`Listening on port:: http://localhost:${port}/`)
// });