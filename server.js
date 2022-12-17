import app from "./app.js";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import sockets from "./src/sockets.js";
import { logger, errorLogger } from "./src/utils/loggers.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const httpServer = server.listen(PORT, () => {
  return logger.info(`Servidor escuchando en puerto ${PORT}`);
});
httpServer.on("error", (error) => {
  return errorLogger.error(`Error en el servidor ${error}`);
});

const io = new WebSocketServer(httpServer);

sockets(io);