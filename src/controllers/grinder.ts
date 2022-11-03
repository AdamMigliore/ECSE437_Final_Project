import { Request, Response } from "express";
import CreateGrinderInput from "../interfaces/createGrinderInput";
import GrinderService from "../services/grinderService";

const getGrinderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const f = await GrinderService.getById(Number(id));
  return res.status(200).send(f);
};

const createGrinder = async (req: Request, res: Response) => {
  const grinder: CreateGrinderInput = req.body;
  const c = await GrinderService.create(grinder);
  if (c == null) {
    return res.status(400);
  }
  return res.status(201).send(c);
};

const deleteGrinder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const d = await GrinderService.deleteById(Number(id));

  if (d == null) {
    return res.status(400);
  }

  return res.send(d);
};

export { getGrinderById, createGrinder, deleteGrinder };
