import http from "http";

import app from "./app.js";

import { config } from "./configs/env.config.js";
import { connectDB } from "./configs/db.config.js";

import { initSocket } from "./sockets/socket.server.js";

import { logger } from "./common/services/logger.service.js";

const PORT: number = Number(config.PORT) || 5000;

/*
  We are storing the HTTP server in a global variable
  because we will need it later during graceful shutdown.

  During shutdown we have to:
  - stop accepting new requests
  - close the server properly
*/

let server: http.Server;

/*
  Main application startup function.

  Startup order:

  1. Connect database
  2. Create HTTP server
  3. Initialize socket server
  4. Start listening on PORT
*/

const bootstrap = async () => {
  try {
    logger.info("Starting server bootstrap...");

    /*
      First connect database.

      If database connection fails,
      application should not start.
    */

    await connectDB();

    logger.info("Database connected successfully");

    /*
      Creating raw Node.js HTTP server from express app.

      We are not using app.listen()
      because Socket.IO needs the actual HTTP server instance.
    */

    server = http.createServer(app);

    /*
      Attach Socket.IO to HTTP server.

      This enables:
      - realtime notifications
      - chats
      - live updates
    */

    await initSocket(server);

    logger.info("Socket server initialized");

    /*
      Start server and listen for incoming requests.
    */

    server.listen(PORT, () => {
      logger.info(`Server is running on port: ${PORT}`);
    });

  } catch (error) {

    /*
      If anything fails during startup:
      - database
      - socket initialization
      - server creation

      then log the error and stop application.
    */

    logger.fatal(error, "Application bootstrap failed");

    process.exit(1);
  }
};

/*
  Start application
*/

bootstrap();

/*
  Handles synchronous errors that were never caught.

  Example:

  throw new Error("Crash");

  OR

  undefined.test()

  These errors can crash the application completely.
*/

process.on("uncaughtException", (error) => {
  logger.fatal(error, "Uncaught Exception");

  /*
    Instead of killing app immediately,
    we shutdown everything properly.
  */

  gracefulShutdown();
});

/*
  Handles promise rejections that were never caught.

  Example:

  Promise.reject()

  OR

  async function failure without try/catch
*/

process.on("unhandledRejection", (reason) => {
  logger.fatal(reason, "Unhandled Rejection");

  gracefulShutdown();
});

/*
  Graceful shutdown means closing the application safely.

  Why this is important:

  Without graceful shutdown:
  - active requests can break
  - DB operations may stay incomplete
  - sockets can disconnect suddenly
  - data corruption can happen

  Proper shutdown flow:

  1. Stop taking new requests
  2. Finish current requests
  3. Close server
  4. Cleanup resources
  5. Exit process
*/

const gracefulShutdown = async () => {
  try {
    logger.info("Starting graceful shutdown...");

    /*
      server.close():

      - stops new incoming requests
      - allows running requests to finish
      - then closes server
    */

    if (server) {
      server.close(() => {
        logger.info("HTTP server closed");
      });
    }

    /*
      In large production apps,
      we usually close other resources too.

      Example:

      - MongoDB connection
      - Redis connection
      - BullMQ workers
      - Socket.IO
    */

    process.exit(1);

  } catch (err) {

    /*
      If shutdown itself fails,
      forcefully stop the application.
    */

    logger.fatal(err, "Graceful shutdown failed");

    process.exit(1);
  }
};

/*
  SIGINT is triggered when we press:

  CTRL + C

  Instead of directly stopping app,
  we perform graceful shutdown.
*/

process.on("SIGINT", async () => {
  logger.warn("SIGINT received");

  await gracefulShutdown();
});

/*
  SIGTERM is mostly used by:

  - Docker
  - PM2
  - Kubernetes
  - cloud providers

  Before shutting down the app,
  cleanup should happen properly.
*/

process.on("SIGTERM", async () => {
  logger.warn("SIGTERM received");

  await gracefulShutdown();
});

