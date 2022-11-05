import { describe, expect, test } from "@jest/globals";
import prisma from "../src/config/prisma";
import CreateBeanInput from "../src/interfaces/createBeanInput";
import BeanService from "../src/services/beanService";

const b1: CreateBeanInput = {
    brand: "Lavazza",
    model: "Gold",
    roast: "Light",
};

describe("[Unit Test] Bean controllers", () => {
    test("getById returns a Bean", async () => {
      //  Given
      const createdBean = await prisma.bean.create({ data: b1 });
      const id = createdBean.id;
  
      // When
      const foundBean = await BeanService.getById(id);
  
      //  Then
      expect(foundBean).toStrictEqual(createdBean);
  
      //  Cleanup
      await prisma.bean.delete({ where: { id } });
    });

    test("deleteById deletes a Bean", async () => {
        //  Given
        const createdBean = await prisma.bean.create({ data: b1 });
        const id = createdBean.id;
    
        // When
        await BeanService.deleteById(id);
    
        //  Then
        const f = await prisma.bean.findUnique({ where: { id } });
        expect(f).toStrictEqual(null);
    });

    test("create creates a Bean", async () => {
        // When
        const createdBean = await BeanService.create(b1);
        const id = createdBean.id;
    
        //  Then
        const f = await prisma.bean.findUnique({ where: { id } });
        expect(createdBean).toStrictEqual(f);
        expect(createdBean.id).toBeDefined();
        expect(createdBean.createdAt).toBeDefined();
    
        //  Cleanup
        await prisma.bean.delete({ where: { id } });
    });
});