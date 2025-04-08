import { db } from "@/db";
import { timeEntries } from "@/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

// Create a time entry
export const createTimeEntry = async (req: Request, res: Response) => {
  try {
    const { userId, clientId, description, startTime, endTime, duration } =
      req.body;
    const [newTimeEntry] = await db
      .insert(timeEntries)
      .values({ userId, clientId, description, startTime, endTime, duration })
      .returning();
    res.status(201).json(newTimeEntry);
  } catch (error) {
    console.error("Error creating time entry:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get all time entries
export const getTimeEntries = async (_req: Request, res: Response) => {
  try {
    const allTimeEntries = await db.select().from(timeEntries);
    res.status(200).json(allTimeEntries);
  } catch (error) {
    console.error("Error fetching time entries:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get a single time entry by ID
export const getTimeEntryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Time Entry ID is required" });
      return;
    }

    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      res.status(400).json({ message: "Invalid time entry ID" });
      return;
    }

    const [timeEntry] = await db
      .select()
      .from(timeEntries)
      .where(eq(timeEntries.id, parsedId));

    if (!timeEntry) {
      res.status(404).json({ message: "Time entry not found" });
      return;
    }

    res.status(200).json(timeEntry);
  } catch (error) {
    console.error("Error fetching time entry by ID:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get time entries by client ID
export const getTimeEntriesByClientId = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    if (!clientId) {
      res.status(400).json({ message: "Client ID is required" });
      return;
    }

    const parsedClientId = parseInt(clientId, 10);
    if (Number.isNaN(parsedClientId)) {
      res.status(400).json({ message: "Invalid client ID" });
      return;
    }

    const timeEntriesForClient = await db
      .select()
      .from(timeEntries)
      .where(eq(timeEntries.clientId, parsedClientId));

    if (!timeEntriesForClient.length) {
      res
        .status(404)
        .json({ message: "No time entries found for this client" });
      return;
    }

    res.status(200).json(timeEntriesForClient);
  } catch (error) {
    console.error("Error fetching time entries by client:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update a time entry
export const updateTimeEntry = async (req: Request, res: Response) => {
  try {
    const { clientId, description, startTime, endTime, duration } = req.body;
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Time Entry ID is required" });
      return;
    }

    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      res.status(400).json({ message: "Invalid time entry ID" });
      return;
    }

    const [updatedTimeEntry] = await db
      .update(timeEntries)
      .set({ clientId, description, startTime, endTime, duration })
      .where(eq(timeEntries.id, parsedId))
      .returning();

    if (!updatedTimeEntry) {
      res.status(404).json({ message: "Time entry not found" });
      return;
    }

    res.status(200).json(updatedTimeEntry);
  } catch (error) {
    console.error("Error updating time entry:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Delete a time entry
export const deleteTimeEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Time Entry ID is required" });
      return;
    }

    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      res.status(400).json({ message: "Invalid time entry ID" });
      return;
    }

    const [deletedTimeEntry] = await db
      .delete(timeEntries)
      .where(eq(timeEntries.id, parsedId))
      .returning();

    if (!deletedTimeEntry) {
      res.status(404).json({ message: "Time entry not found" });
      return;
    }

    res.status(200).json({ message: "Time entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting time entry:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
