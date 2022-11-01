import express from "express";
import bp from "body-parser";
import router from "./routers/router";
import "express-async-errors";

// Create the express application
const app = express();

// Use the body-parser middleware to parse the body as json
app.use(bp.json());
app.use(router);

export default app;
