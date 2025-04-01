import express from "express";
import dotenv from "dotenv";
// import userRoutes from './routes/userRoutes';
import clientRoutes from "@/routes/clientRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/clients", clientRoutes);

export default app;
