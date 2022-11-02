import { jest, describe, expect, test } from "@jest/globals";
import prisma from "../src/config/prisma";
import CreateGrinderInput from "../src/interfaces/createGrinderInput";
import GrinderService from "../src/services/grinderService";

const g1: CreateGrinderInput = {
  brand: "Eureka",
  model: "Mignon Silenzio",
  year: "2022",
};

jest.setTimeout(10000);

describe("[Unit Test] Grinder controllers", () => {
  test("getById returns a Grinder", async () => {
    //  Given
    const c = await prisma.grinder.create({ data: g1 });
    const id = c.id;

    // When
    const f = await GrinderService.getById(id);

    //  Then
    expect(f).toStrictEqual(c);

    //  Cleanup
    await prisma.grinder.delete({ where: { id } });
  });

  test("deleteById deletes a Grinder", async () => {
    //  Given
    const c = await prisma.grinder.create({ data: g1 });
    const id = c.id;

    // When
    await GrinderService.deleteById(id);

    //  Then
    const f = await prisma.grinder.findUnique({ where: { id } });
    expect(f).toStrictEqual(null);
  });

  test("create creates a Grinder", async () => {
    // When
    const c = await GrinderService.create(g1);
    const id = c.id;

    //  Then
    const f = await prisma.grinder.findUnique({ where: { id } });
    expect(c).toStrictEqual(f);
    expect(c.id).toBeDefined();
    expect(c.createdAt).toBeDefined();

    //  Cleanup
    await prisma.grinder.delete({ where: { id } });
  });
});
