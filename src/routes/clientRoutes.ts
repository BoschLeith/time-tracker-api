import {
  createClientController,
  deleteClientController,
  getClientController,
  getClientsController,
  updateClientController,
} from "@/controllers/clientController";
import { Router } from "express";

const router = Router();

router.post("/", createClientController);
router.get("/", getClientsController);
router.get("/:id", getClientController);
router.put("/:id", updateClientController);
router.delete("/:id", deleteClientController);

export default router;
