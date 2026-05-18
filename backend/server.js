
require("dotenv").config();

const http = require("http");

const app = require("./src/app");

const connectDB =
require("./src/config/db");

const { Server } =
require("socket.io");


// DB Connect
connectDB();


// Create Server
const server =
http.createServer(app);


// Socket.io
const io = new Server(server, {
    cors: {
  origin: [
  "http://localhost:5173",
  "https://smart-society-frontend.vercel.app"
],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true

}
});

global.io = io;


// Socket Connection
io.on(
  "connection",
  (socket) => {

    console.log(
      `User Connected: ${socket.id}`
    );

    socket.on(
      "joinRoom",
      (userId) => {
        socket.join(userId);
      }
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          `Disconnected: ${socket.id}`
        );
      }
    );
  }
);


// Start Server
const PORT =
process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});