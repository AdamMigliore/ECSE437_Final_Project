import express from "express";
import machineRouter from "./machine";
import grinderRouter from "./grinder";
import beanRouter from "./bean";

const router = express.Router();

router.use("/machine", machineRouter);
router.use("/grinder", grinderRouter);
router.use("/bean", beanRouter);

router.get("/", (req, res) => {
  return res.send("hello world");
});

export default router;
