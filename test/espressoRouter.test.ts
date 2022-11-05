import { describe, expect, test } from "@jest/globals";
import prisma from "../src/config/prisma";
import supertest from "supertest";
import app from "../src/app";
import CreateBeanInput from "../src/interfaces/createBeanInput";
import CreateGrinderInput from "../src/interfaces/createGrinderInput";
import CreateMachineInput from "../src/interfaces/createMachineInput";
import CreateEspressoInput from "../src/interfaces/createEspressoInput";

const m1: CreateMachineInput = {
    brand: "Rocket",
    model: "Appartamento",
    year: "2022",
};

const g1: CreateGrinderInput = {
    brand: "Eureka",
    model: "Mignon Silenzio",
    year: "2022",
};

const b1: CreateBeanInput = {
    brand: "Lavazza",
    model: "Gold",
    roast: "Light",
};

describe("[Integration Test] Espresso routes", () => {
    test("GET /:id returns null", async () => {
        // When
        const res = await supertest(app).get("/espresso/-1");
    
        // Then
        expect(res.body).toStrictEqual({});
    });

    test("GET /:id returns a Espreso", async () => {
        // Given
        const machine1 = await prisma.machine.create({ data: m1 });
        const grinder1 = await prisma.grinder.create({ data: g1 });
        const bean1 = await prisma.bean.create({ data: b1 });
        const e1: CreateEspressoInput = {
            beansWeight: 10, 
            shotTimeInSeconds: 5,
            pressure: 30,
            notes: "almond milk",
            grindSetting: "extra grinded",
            machineId: machine1.id,
            grinderId: grinder1.id,
            beanId: bean1.id,
        };
        const c = await prisma.espresso.create({ data: e1 });
        const id = c.id;
    
        //  When
        const res = await supertest(app).get(`/espresso/${id}`);
    
        //  Then
        expect(res.body.beansWeight).toBe(e1.beansWeight);
        expect(res.body.shotTimeInSeconds).toBe(e1.shotTimeInSeconds);
        expect(res.body.pressure).toBe(e1.pressure);
        expect(res.body.notes).toBe(e1.notes);
        expect(res.body.grindSetting).toBe(e1.grindSetting);
        expect(res.body.machineId).toBe(e1.machineId);
        expect(res.body.grinderId).toBe(e1.grinderId);
        expect(res.body.beanId).toBe(e1.beanId);
    
        //  Cleanup
        await prisma.espresso.delete({ where: { id } });
        await prisma.machine.delete({ where: { id : machine1.id } });
        await prisma.grinder.delete({ where: { id : grinder1.id } });
        await prisma.bean.delete({ where: { id : bean1.id } });
    });

    test("POST / creates an espresso", async () => {
        // Given
        const machine1 = await prisma.machine.create({ data: m1 });
        const grinder1 = await prisma.grinder.create({ data: g1 });
        const bean1 = await prisma.bean.create({ data: b1 });
        const e1: CreateEspressoInput = {
            beansWeight: 10, 
            shotTimeInSeconds: 5,
            pressure: 30,
            notes: "almond milk",
            grindSetting: "extra grinded",
            machineId: machine1.id,
            grinderId: grinder1.id,
            beanId: bean1.id,
        };

        // When
        const res = await supertest(app).post(`/espresso`).send(e1);
    
        //  Then
        expect(res.body).toBeDefined();
    
        //  Cleanup
        await prisma.espresso.delete({ where: { id: res.body.id } });
        await prisma.machine.delete({ where: { id : machine1.id } });
        await prisma.grinder.delete({ where: { id : grinder1.id } });
        await prisma.bean.delete({ where: { id : bean1.id } });
    });

    test("DELETE /:id deletes an espresso", async () => {
        // Given
        const machine1 = await prisma.machine.create({ data: m1 });
        const grinder1 = await prisma.grinder.create({ data: g1 });
        const bean1 = await prisma.bean.create({ data: b1 });
        const e1: CreateEspressoInput = {
            beansWeight: 10, 
            shotTimeInSeconds: 5,
            pressure: 30,
            notes: "almond milk",
            grindSetting: "extra grinded",
            machineId: machine1.id,
            grinderId: grinder1.id,
            beanId: bean1.id,
        };
        const c = await prisma.espresso.create({ data: e1 });
        const id = c.id;
    
        //  When
        const res = await supertest(app).delete(`/espresso/${id}`);
    
        //  Then
        expect(res.body).toBeDefined();
    
        //  Cleanup
        await prisma.machine.delete({ where: { id : machine1.id } });
        await prisma.grinder.delete({ where: { id : grinder1.id } });
        await prisma.bean.delete({ where: { id : bean1.id } });
    });
});
