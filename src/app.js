import express from "express";
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

import authRoutes from './routes/auth.routes.js'
import entryRoutes from './routes/entry.routes.js'

const app = express();
app.use(express.json());
app.use(cors());
app.use([authRoutes, entryRoutes])

const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT} `))