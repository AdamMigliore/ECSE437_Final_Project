import { describe, expect, test } from "@jest/globals";
import prisma from "../src/config/prisma";
import supertest from "supertest";
import app from "../src/app";
import CreateMachineInput from "../src/interfaces/createMachineInput";

const m1: CreateMachineInput = {
  brand: "Rocket",
  model: "Appartamento",
  year: "2022",
};

describe("[Integration Test] Machine routes", () => {
  test("GET /:id returns null", async () => {
    // When
    const res = await supertest(app).get("/machine/1");

    // Then
    expect(res.body).toStrictEqual({});
  });

  test("GET /:id returns a Machine", async () => {
    // Given
    const c = await prisma.machine.create({ data: m1 });
    const id = c.id;

    //  When
    const res = await supertest(app).get(`/machine/${id}`);

    //  Then
    expect(res.body.brand).toBe(m1.brand);
    expect(res.body.model).toBe(m1.model);
    expect(res.body.year).toBe(m1.year);

    //  Cleanup
    await prisma.machine.delete({ where: { id } });
  });

  test("POST / creates a Machine", async () => {
    // Given
    // When
    const res = await supertest(app).post(`/machine`).send(m1);

    //  Then
    expect(res.body).toBeDefined();

    //  Cleanup
    await prisma.machine.delete({ where: { id: res.body.id } });
  });

  test("DELETE /:id deletes a Machine", async () => {
    // Given
    const c = await prisma.machine.create({ data: m1 });
    const id = c.id;

    //  When
    const res = await supertest(app).delete(`/machine/${id}`);

    //  Then
    expect(res.body).toBeDefined();

    //  Cleanup
  });
});
