import { db } from "@/config/database";
import { clients } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createClient = async (clientData: {
  name: string;
  email?: string;
  hourlyRate?: number;
}) => {
  return db.insert(clients).values(clientData).returning();
};

export const getAllClients = async () => {
  return db.select().from(clients);
};

export const getClientById = async (id: number) => {
  return db.select().from(clients).where(eq(clients.id, id));
};

export const updateClient = async (
  id: number,
  clientData: { name?: string; email?: string; hourlyRate?: number }
) => {
  return db
    .update(clients)
    .set(clientData)
    .where(eq(clients.id, id))
    .returning();
};

export const deleteClient = async (id: number) => {
  return db.delete(clients).where(eq(clients.id, id)).returning();
};
