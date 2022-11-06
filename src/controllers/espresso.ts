import { Request, Response } from "express";
import CreateEspressoInput from "../interfaces/createEspressoInput";
import EspressoService from "../services/espressoService";

const getEspressoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const foundEspresso = await EspressoService.getById(Number(id));
    return res.status(200).send(foundEspresso);
};

const createEspresso = async (req: Request, res: Response) => {
    const espresso: CreateEspressoInput = req.body;
    const createdEspresso = await EspressoService.create(espresso);
    if (createdEspresso == null) {
      return res.status(400);
    }
    return res.status(201).send(createdEspresso);
};

const deleteEspresso = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedEspresso = await EspressoService.deleteById(Number(id));
    if (deletedEspresso == null) {
      return res.status(400);
    }
    return res.send(deletedEspresso);
};

export { getEspressoById, createEspresso, deleteEspresso };