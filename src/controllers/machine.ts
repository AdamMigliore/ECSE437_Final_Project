import { Request, Response } from "express";
import prisma from "./../config/prisma";

const getMachineById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const foundMachine = await prisma.machine.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.status(200).send(foundMachine);
};

const createMachine = async (req: Request, res: Response) => {
  const machine = req.body;
  console.log(machine);
  const createdMachine = await prisma.machine.create({
    data: machine,
  });
  if (createdMachine == null) {
    return res.status(400);
  }
  return res.status(201).send(createdMachine);
};

const deleteMachine = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedMachine = await prisma.machine.delete({
    where: {
      id: Number(id),
    },
  });

  if (deletedMachine == null) {
    return res.status(400);
  }

  return res.send(deletedMachine);
};

export { getMachineById, createMachine, deleteMachine };
