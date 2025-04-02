import { db } from "@/db";
import { clients } from "@/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, email, hourlyRate } = req.body;
    const [newClient] = await db
      .insert(clients)
      .values({ name, email, hourlyRate })
      .returning();
    res.status(201).json(newClient);
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getClients = async (_req: Request, res: Response) => {
  try {
    const allClients = await db.select().from(clients);
    res.status(200).json(allClients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Client ID is required" });
      return;
    }

    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      res.status(400).json({ message: "Invalid client ID" });
      return;
    }

    const [client] = await db
      .select()
      .from(clients)
      .where(eq(clients.id, parsedId));
    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { name, email, hourlyRate } = req.body;
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Client ID is required" });
      return;
    }

    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      res.status(400).json({ message: "Invalid client ID" });
      return;
    }

    const [updatedClient] = await db
      .update(clients)
      .set({ name, email, hourlyRate })
      .where(eq(clients.id, parsedId))
      .returning();

    if (!updatedClient) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Client ID is required" });
      return;
    }

    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      res.status(400).json({ message: "Invalid client ID" });
      return;
    }

    const [deletedClient] = await db
      .delete(clients)
      .where(eq(clients.id, parsedId))
      .returning();

    if (!deletedClient) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
