const { Server } = require("socket.io");

const io  = new Server(4000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log("[✓] Cliente conectado");

  socket.on("disconnect", () => {
    console.log("[✗] Cliente desconectado");
  });
});

module.exports = io ;