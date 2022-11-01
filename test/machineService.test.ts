import { jest, describe, expect, test } from "@jest/globals";
import prisma from "../src/config/prisma";
import CreateMachineInput from "../src/interfaces/createMachineInput";
import MachineService from "../src/services/machineService";

const m1: CreateMachineInput = {
  brand: "Rocket",
  model: "Appartamento",
  year: "2022",
};

jest.setTimeout(10000);

describe("[Unit Test] Machine controllers", () => {
  test("getById returns a Machine", async () => {
    //  Given
    const createdMachine = await prisma.machine.create({ data: m1 });
    const id = createdMachine.id;

    // When
    const foundMachine = await MachineService.getById(id);

    //  Then
    expect(foundMachine).toStrictEqual(createdMachine);

    //  Cleanup
    await prisma.machine.delete({ where: { id } });
  });

  test("deleteById deletes a Machine", async () => {
    //  Given
    const createdMachine = await prisma.machine.create({ data: m1 });
    const id = createdMachine.id;

    // When
    await MachineService.deleteById(id);

    //  Then
    const f = await prisma.machine.findUnique({ where: { id } });
    expect(f).toStrictEqual(null);
  });

  test("create creates a Machine", async () => {
    // When
    const createdMachine = await MachineService.create(m1);
    const id = createdMachine.id;

    //  Then
    const f = await prisma.machine.findUnique({ where: { id } });
    expect(createdMachine).toStrictEqual(f);
    expect(createdMachine.id).toBeDefined();
    expect(createdMachine.createdAt).toBeDefined();

    //  Cleanup
    await prisma.machine.delete({ where: { id } });
  });
});
