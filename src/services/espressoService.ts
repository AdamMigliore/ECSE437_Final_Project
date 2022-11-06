import prisma from "../config/prisma";
import CreateEspressoInput from "../interfaces/createEspressoInput";

const getById = async (id: number) => {
  return await prisma.espresso.findUnique({
    where: { id },
    include: {
      beans: true,
      grinder: true,
      machine: true,
    },
  });
};

const create = async (data: CreateEspressoInput) => {
  const {
    beansWeight,
    shotTimeInSeconds,
    pressure,
    notes,
    grindSetting,
    machineId,
    grinderId,
    beanId,
  } = data;

  return await prisma.espresso.create({
    data: {
      beansWeight,
      shotTimeInSeconds,
      pressure,
      notes,
      grindSetting,
      machine: {
        connect: {
          id: machineId,
        },
      },
      grinder: {
        connect: {
          id: grinderId,
        },
      },
      beans: {
        connect: {
          id: beanId,
        },
      },
    },
  });
};

const deleteById = async (id: number) => {
  return await prisma.espresso.delete({ where: { id } });
};

export default { getById, create, deleteById };
