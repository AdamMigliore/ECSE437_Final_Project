import { describe, expect, test } from "@jest/globals";
import prisma from "../src/config/prisma";
import supertest from "supertest";
import app from "../src/app";
import CreateBeanInput from "../src/interfaces/createBeanInput";

const b1: CreateBeanInput = {
  brand: "Lavazza",
  model: "Gold",
  roast: "Light",
};

describe("[Integration Test] Bean routes", () => {
    test("GET /:id returns null", async () => {
      // When
      const res = await supertest(app).get("/bean/-1");
  
      // Then
      expect(res.body).toStrictEqual({});
    });
    
    test("GET /:id returns a Bean", async () => {
        // Given
        const c = await prisma.bean.create({ data: b1 });
        const id = c.id;
    
        //  When
        const res = await supertest(app).get(`/bean/${id}`);
    
        //  Then
        expect(res.body.brand).toBe(b1.brand);
        expect(res.body.model).toBe(b1.model);
        expect(res.body.roast).toBe(b1.roast);
    
        //  Cleanup
        await prisma.bean.delete({ where: { id } });
    });
    
    test("POST / creates a Bean", async () => {
        // Given
        // When
        const res = await supertest(app).post(`/bean`).send(b1);
    
        //  Then
        expect(res.body).toBeDefined();
    
        //  Cleanup
        await prisma.bean.delete({ where: { id: res.body.id } });
    });

    test("DELETE /:id deletes a Bean", async () => {
        // Given
        const c = await prisma.bean.create({ data: b1 });
        const id = c.id;
    
        //  When
        const res = await supertest(app).delete(`/bean/${id}`);
    
        //  Then
        expect(res.body).toBeDefined();
    
        //  Cleanup
    });
});