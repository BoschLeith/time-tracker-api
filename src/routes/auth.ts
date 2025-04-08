import express from "express";
import * as auth from "@/handlers/auth";

const router = express.Router();

router.post("/auth/register", auth.registerUser);
router.post("/auth/login", auth.loginUser);

export default router;
