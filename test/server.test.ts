import { describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";

describe("Test the base route for our server", () => {
  test("Expect / to return Hello World! ", async () => {
    const res = await supertest(app).get("/");
    expect(res.text).toBe("hello world");
  });
});
