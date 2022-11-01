import prisma from "../config/prisma";
import CreateMachineInput from "../interfaces/createMachineInput";

const getById = async (id: number) => {
  return await prisma.machine.findUnique({ where: { id } });
};

const create = async (data: CreateMachineInput) => {
  return await prisma.machine.create({
    data,
  });
};

const deleteById = async (id: number) => {
  return await prisma.machine.delete({ where: { id } });
};

export default { getById, create, deleteById };
