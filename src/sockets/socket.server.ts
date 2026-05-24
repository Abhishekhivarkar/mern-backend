
import http from "node:http";
import { Server } from "socket.io";

import { SOCKET_EVENTS } from "./socket.events.js";
import { getSocketAdapter } from "./socket.adapter.js";

import { redisClient } from "../configs/redis.config.js";

let io: Server;

export const initSocket = async (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.adapter(getSocketAdapter());

  const subscriber = redisClient.duplicate();

  subscriber.subscribe("socket-events");

  subscriber.on(
    "message",

    (
      channel,

      message,
    ) => {
      console.log("SUBSCRIBE HIT");

      console.log(channel);

      console.log(message);

      const data = JSON.parse(message);

      io.to(data.room).emit(data.event, data.payload);
    },
  );

  io.on(
    SOCKET_EVENTS.CONNECTION,

    (socket) => {
      socket.on(
        SOCKET_EVENTS.JOIN,

        (userId: string) => {
          console.log("User joined", userId);

          socket.join(`user:${userId}`);
        },
      );
    },
  );
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }

  return io;
};
