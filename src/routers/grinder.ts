import express from "express";
import {
  createGrinder,
  deleteGrinder,
  getGrinderById,
} from "../controllers/grinder";

const grinderRouter = express.Router();

grinderRouter.get("/:id", getGrinderById);
grinderRouter.post("/", createGrinder);
grinderRouter.delete("/:id", deleteGrinder);

export default grinderRouter;
