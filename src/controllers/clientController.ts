import {
  createClient,
  deleteClient,
  getAllClients,
  getClientById,
  updateClient,
} from "@/services/clientService";
import { Request, Response } from "express";

export const createClientController = async (req: Request, res: Response) => {
  try {
    const [newClient] = await createClient(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: "Error creating client", error });
  }
};

export const getClientsController = async (req: Request, res: Response) => {
  try {
    const clients = await getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching clients", error });
  }
};

export const getClientController = async (req: Request, res: Response) => {
  try {
    const clientId = req.params.id ? parseInt(req.params.id) : NaN;
    if (isNaN(clientId)) {
      res.status(400).json({ message: "Invalid client ID" });
    }
    const [client] = await getClientById(clientId);
    if (!client) {
      res.status(404).json({ message: "Client not found" });
    } else {
      res.status(200).json(client);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching client", error });
  }
};

export const updateClientController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id ? parseInt(req.params.id) : NaN;
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid client ID" });
    }
    const [updatedClient] = await updateClient(id, req.body);
    if (!updatedClient) {
      res.status(404).json({ message: "Client not found" });
    } else {
      res.status(200).json(updatedClient);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error });
  }
};

export const deleteClientController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id ? parseInt(req.params.id) : NaN;
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid client ID" });
    }
    const deletedClient = await deleteClient(id);
    if (!deletedClient) {
      res.status(404).json({ message: "Client not found" });
    } else {
      res.status(200).json({ message: "Client deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error });
  }
};
