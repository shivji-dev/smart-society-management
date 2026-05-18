const { Server } = require("socket.io");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
  origin: [
  "http://localhost:5173",
  "https://smart-society.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true

    }
  });

  io.on("connection", (socket) => {
    console.log(
      `User Connected: ${socket.id}`
    );

    socket.on("disconnect", () => {
      console.log(
        `User Disconnected: ${socket.id}`
      );
    });
  });

  return io;
};

module.exports = initSocket;