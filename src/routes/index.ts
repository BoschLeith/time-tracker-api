import express from "express";
import clientRoutes from "./clients";
import timeEntryRoutes from "./timeEntries";
import transactionRoutes from "./transactions";

const router = express.Router();

router.use(clientRoutes);
router.use(timeEntryRoutes);
router.use(transactionRoutes);

export default router;
