import { describe, expect, test } from "@jest/globals";
import prisma from "../src/config/prisma";
import CreateBeanInput from "../src/interfaces/createBeanInput";
import CreateEspressoInput from "../src/interfaces/createEspressoInput";
import CreateGrinderInput from "../src/interfaces/createGrinderInput";
import CreateMachineInput from "../src/interfaces/createMachineInput";
import EspressoService from "../src/services/espressoService";

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

describe("[Unit Test] Espresso controllers", () => {
    test("getById returns an Espresso", async () => {
        //  Given
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
        const createdEspresso = await prisma.espresso.create({ data: e1 });
        const id = createdEspresso.id;
    
        // When
        const foundEspresso = await EspressoService.getById(id);
    
        //  Then
        expect(foundEspresso).toStrictEqual(createdEspresso);
    
        //  Cleanup
        await prisma.espresso.delete({ where: { id } });
        await prisma.machine.delete({ where: { id : machine1.id } });
        await prisma.grinder.delete({ where: { id : grinder1.id } });
        await prisma.bean.delete({ where: { id : bean1.id } });
      });

      test("deleteById deletes a Espresso", async () => {
        //  Given
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
        const createdEspresso = await prisma.espresso.create({ data: e1 });
        const id = createdEspresso.id;
    
        // When
        await EspressoService.deleteById(id);
    
        //  Then
        const f = await prisma.espresso.findUnique({ where: { id } });
        expect(f).toStrictEqual(null);
        await prisma.machine.delete({ where: { id : machine1.id } });
        await prisma.grinder.delete({ where: { id : grinder1.id } });
        await prisma.bean.delete({ where: { id : bean1.id } });
      });

      test("create creates an espresso", async () => {
        //Given 
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
        const createdEspresso = await EspressoService.create(e1);
        const id = createdEspresso.id;
    
        //  Then
        const f = await prisma.espresso.findUnique({ where: { id } });
        expect(createdEspresso).toStrictEqual(f);
        expect(createdEspresso.id).toBeDefined();
        expect(createdEspresso.createdAt).toBeDefined();
    
        //  Cleanup
        await prisma.espresso.delete({ where: { id } });
        await prisma.machine.delete({ where: { id : machine1.id } });
        await prisma.grinder.delete({ where: { id : grinder1.id } });
        await prisma.bean.delete({ where: { id : bean1.id } });
      });
});