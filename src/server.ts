import http from "http";
import { config } from "./config/config";
import app from "./app";

const server = http.createServer(app);

// Create the server and listen for connections
server.listen(config.PORT, () => {
  console.info(`Server is currently running on port ${config.PORT}`);
});
