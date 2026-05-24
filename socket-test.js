import { io } from "socket.io-client";

console.log("starting");

const socket = io("http://localhost:5001", {
  transports: ["websocket"],
});

socket.on(
  "connect",

  () => {
    console.log("connected");

    console.log(socket.id);

    socket.emit(
      "join",

      "6a0d884fc5c1969a23724e66",
    );
  },
);

socket.on(
  "connect_error",

  (err) => {
    console.log("error");

    console.log(err.message);
  },
);

socket.on(
  "note:created",

  (data) => {
    console.log("notification");

    console.log(data);
  },
);
