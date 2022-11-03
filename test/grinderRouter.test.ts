import { describe, expect, test } from "@jest/globals";
import prisma from "../src/config/prisma";
import supertest from "supertest";
import app from "../src/app";
import CreateGrinderInput from "../src/interfaces/createGrinderInput";

const g1: CreateGrinderInput = {
  brand: "Eureka",
  model: "Mignon Silenzio",
  year: "2022",
};

describe("[Integration Test] Grinder routes", () => {
  test("GET /:id returns null", async () => {
    // When
    const res = await supertest(app).get("/grinder/0");

    // Then
    expect(res.body).toStrictEqual({});
  });

  test("GET /:id returns a Grinder", async () => {
    // Given
    const c = await prisma.grinder.create({ data: g1 });
    const id = c.id;

    //  When
    const res = await supertest(app).get(`/grinder/${id}`);

    //  Then
    expect(res.body.brand).toBe(g1.brand);
    expect(res.body.model).toBe(g1.model);
    expect(res.body.year).toBe(g1.year);

    //  Cleanup
    await prisma.grinder.delete({ where: { id } });
  });

  test("POST / creates a Grinder", async () => {
    // Given
    // When
    const res = await supertest(app).post(`/grinder`).send(g1);

    //  Then
    expect(res.body).toBeDefined();

    //  Cleanup
    await prisma.grinder.delete({ where: { id: res.body.id } });
  });

  test("DELETE /:id deletes a Grinder", async () => {
    // Given
    const c = await prisma.grinder.create({ data: g1 });
    const id = c.id;

    //  When
    const res = await supertest(app).delete(`/grinder/${id}`);

    //  Then
    expect(res.body).toBeDefined();

    //  Cleanup
  });
});
