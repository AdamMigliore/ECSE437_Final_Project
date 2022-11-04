import { Request, Response } from "express";
import CreateBeanInput from "../interfaces/createBeanInput";
import BeanService from "../services/beanService";


const getBeanById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const foundBean = await BeanService.getById(Number(id));
    return res.status(200).send(foundBean);
};

const createBean = async (req: Request, res: Response) => {
    const bean: CreateBeanInput = req.body;
    const createdBean = await BeanService.create(bean);
    if (createdBean == null) {
      return res.status(400);
    }
    return res.status(201).send(createdBean);
};

const deleteBean = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const deletedBean = await BeanService.deleteById(Number(id));
  
    if (deletedBean == null) {
      return res.status(400);
    }
  
    return res.send(deletedBean);
};

export { getBeanById, createBean, deleteBean };