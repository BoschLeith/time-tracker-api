import cors from "cors";
import express from "express";

import routes from "@/routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
