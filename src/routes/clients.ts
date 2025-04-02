import express from "express";
import * as client from "@/handlers/client";

const router = express.Router();

router.post("/clients", client.createClient);
router.get("/clients", client.getClients);
router.get("/clients/:id", client.getClientById);
router.put("/clients/:id", client.updateClient);
router.delete("/clients/:id", client.deleteClient);

export default router;
