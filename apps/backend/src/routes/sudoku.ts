import { Router } from "express";
import { getSudoku, submitSudoku } from "../controllers/sudokuController";

const router = Router();

router.get("/", getSudoku);
router.post("/", submitSudoku);

export default router;
