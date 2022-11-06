import { Request, Response } from "express";
import CreateMachineInput from "../interfaces/createMachineInput";
import MachineService from "../services/machineService";

const getMachineById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const foundMachine = await MachineService.getById(Number(id));
  return res.status(200).send(foundMachine);
};

const createMachine = async (req: Request, res: Response) => {
  const machine: CreateMachineInput = req.body;
  const createdMachine = await MachineService.create(machine);
  if (createdMachine == null) {
    return res.status(400);
  }
  return res.status(201).send(createdMachine);
};

const deleteMachine = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedMachine = await MachineService.deleteById(Number(id));
  if (deletedMachine == null) {
    return res.status(400);
  }
  return res.send(deletedMachine);
};

export { getMachineById, createMachine, deleteMachine };
