import express from "express";
import machineRouter from "./machine";

const router = express.Router();

router.use("/machine", machineRouter);

router.get("/", (req, res) => {
  return res.send("hello world");
});

export default router;
