import { Router } from "express";
import {
  createRecord,
  getRecord,
  getRecordsInRange,
} from "../controllers/recordController";

const router = Router();

router.post("/", createRecord);
router.get("/single", getRecord);
router.get("/range", getRecordsInRange);

export default router;
