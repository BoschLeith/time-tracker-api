import express from "express";
import * as transaction from "@/handlers/transaction";

const router = express.Router();

router.post("/transactions", transaction.createTransaction);
router.get("/transactions", transaction.getTransactions);
router.get("/transactions/:id", transaction.getTransactionById);
router.get(
  "/transactions/client/:clientId",
  transaction.getTransactionsByClientId
);
router.put("/transactions/:id", transaction.updateTransaction);
router.delete("/transactions/:id", transaction.deleteTransaction);

export default router;
