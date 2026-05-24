
import { config } from "./configs/env.config.js";
import { connectDB } from "./configs/db.config.js";
import app from "./app.js";
import http from "node:http";
import { initSocket } from "./sockets/socket.server.js";

const PORT = Number(config.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    await initSocket(server);

    server.listen(PORT, () => {
      console.log("server is running on port", PORT);
    });
  } catch (err) {
    console.log("failed to connect server");

    console.error(err);
  }
};

startServer();
