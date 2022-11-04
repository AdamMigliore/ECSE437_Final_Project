import express from "express";
import {
  getBeanById,
  createBean,
  deleteBean,
} from "../controllers/bean";

const beanRouter = express.Router();

beanRouter.get("/:id", getBeanById);
beanRouter.post("/", createBean);
beanRouter.delete("/:id", deleteBean);

export default beanRouter;