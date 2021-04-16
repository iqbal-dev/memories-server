import express from "express";
import { signUp, singIn } from "../controllers/user.js";
const router = express.Router();

router.post("/signin", singIn);
router.post("/signup", signUp);

export default router;
