import prisma from "../config/prisma";
import CreateBeanInput from "../interfaces/createBeanInput";

const getById = async (id:number) => {
    return await prisma.machine.findUnique({ where: { id } });
};

const create = async (data: CreateBeanInput) => {
    return await prisma.machine.create({
      data,
    });
};
  
const deleteById = async (id: number) => {
    return await prisma.machine.delete({ where: { id } });
};
  
export default { getById, create, deleteById };