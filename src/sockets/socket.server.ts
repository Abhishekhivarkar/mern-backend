
import http from "node:http";
import { Server } from "socket.io";
import { SOCKET_EVENTS } from "./socket.events.js";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "",
    },
  });

  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    socket.on("join",(userId:string)=>{
        socket.join(`user:${userId}`)
    })
  });
};

export const getIo =() =>{
    if(!io){
        throw new Error("Socket not initialized")
    }
    return io
}