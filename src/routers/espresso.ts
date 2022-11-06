import express from "express";
import {
  getEspressoById,
  createEspresso,
  deleteEspresso,
} from "../controllers/espresso";

const espressoRouter = express.Router();

espressoRouter.get("/:id", getEspressoById);
espressoRouter.post("/", createEspresso);
espressoRouter.delete("/:id", deleteEspresso);

export default espressoRouter;