import { prismaMock } from "./prismaMock";
import { describe, expect, test } from "@jest/globals";
import {
  getMachineById,
  createMachine,
  deleteMachine,
} from "../src/controllers/machine";

describe("[Unit Test] Machine controllers", () => {
  test("getMachineById returns a Machine", async () => {
    const machine = {
      id: 1,
      brand: "rocket",
      model: "appartamento",
      year: "2022",
      createdAt: Date.now(),
    };

    await prismaMock.machine.findUnique.mockReturnedValue(machine);

    const foundMachine = getMachineById(5);
  });

  test("deleteMachine deletes a Machine", async () => {});

  test("createMachine creates a Machine", async () => {});
});
