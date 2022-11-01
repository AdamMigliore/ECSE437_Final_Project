import express from "express";
import {
  getMachineById,
  createMachine,
  deleteMachine,
} from "../controllers/machine";

const machineRouter = express.Router();

machineRouter.get("/:id", getMachineById);
machineRouter.post("/", createMachine);
machineRouter.delete("/:id", deleteMachine);

export default machineRouter;
