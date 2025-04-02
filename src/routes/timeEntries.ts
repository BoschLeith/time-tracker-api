import express from "express";
import * as timeEntry from "@/handlers/timeEntry";

const router = express.Router();

router.post("/time-entries", timeEntry.createTimeEntry);
router.get("/time-entries", timeEntry.getTimeEntries);
router.get("/time-entries/:id", timeEntry.getTimeEntryById);
router.get(
  "/time-entries/client/:clientId",
  timeEntry.getTimeEntriesByClientId
);
router.put("/time-entries/:id", timeEntry.updateTimeEntry);
router.delete("/time-entries/:id", timeEntry.deleteTimeEntry);

export default router;
