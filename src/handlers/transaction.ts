import { db } from "@/db";
import { transactions } from "@/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

// Create a transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { userId, clientId, amount, description } = req.body;
    const [newTransaction] = await db
      .insert(transactions)
      .values({ userId, clientId, amount, description })
      .returning();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get all transactions
export const getTransactions = async (_req: Request, res: Response) => {
  try {
    const allTransactions = await db.select().from(transactions);
    res.status(200).json(allTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get a single transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Transaction ID is required" });
      return;
    }

    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      res.status(400).json({ message: "Invalid transaction ID" });
      return;
    }

    const [transaction] = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, parsedId));

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error fetching transaction by ID:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get transactions by client ID
export const getTransactionsByClientId = async (
  req: Request,
  res: Response
) => {
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

    const transactionsForClient = await db
      .select()
      .from(transactions)
      .where(eq(transactions.clientId, parsedClientId));

    if (!transactionsForClient.length) {
      res
        .status(404)
        .json({ message: "No transactions found for this client" });
      return;
    }

    res.status(200).json(transactionsForClient);
  } catch (error) {
    console.error("Error fetching transactions by client:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update a transaction
export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { clientId, amount, description } = req.body;
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Transaction ID is required" });
      return;
    }

    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      res.status(400).json({ message: "Invalid transaction ID" });
      return;
    }

    const [updatedTransaction] = await db
      .update(transactions)
      .set({ clientId, amount, description })
      .where(eq(transactions.id, parsedId))
      .returning();

    if (!updatedTransaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Delete a transaction
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Transaction ID is required" });
      return;
    }

    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
      res.status(400).json({ message: "Invalid transaction ID" });
      return;
    }

    const [deletedTransaction] = await db
      .delete(transactions)
      .where(eq(transactions.id, parsedId))
      .returning();

    if (!deletedTransaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
