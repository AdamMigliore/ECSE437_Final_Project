import express from "express";
import machineRouter from "./machine";
import grinderRouter from "./grinder";

const router = express.Router();

router.use("/machine", machineRouter);
router.use("/grinder", grinderRouter);

router.get("/", (req, res) => {
  return res.send("hello world");
});

export default router;
