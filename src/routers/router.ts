import express from "express";
import machineRouter from "./machine";
import grinderRouter from "./grinder";
import beanRouter from "./bean";
import espressoRouter from "./espresso";

const router = express.Router();

router.use("/machine", machineRouter);
router.use("/grinder", grinderRouter);
router.use("/bean", beanRouter);
router.use("/espresso", espressoRouter);

router.get("/", (req, res) => {
  return res.send("hello world");
});

export default router;
