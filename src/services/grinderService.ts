import prisma from "../config/prisma";
import CreateGrinderInput from "../interfaces/createGrinderInput";

const getById = async (id: number) => {
  return await prisma.grinder.findUnique({ where: { id } });
};

const create = async (data: CreateGrinderInput) => {
  return await prisma.grinder.create({
    data,
  });
};

const deleteById = async (id: number) => {
  return await prisma.grinder.delete({ where: { id } });
};

export default { getById, create, deleteById };
