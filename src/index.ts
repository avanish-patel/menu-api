/**
 * Rquired exnternal modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itmesRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHanlder } from "./middleware/not-found.middleware";

dotenv.config();

/**
 * App variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 * App configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/menu/items", itmesRouter);

app.use(errorHandler);
app.use(notFoundHanlder);

/**
 * Server activation
 */

app.listen(PORT, () => {
    console.log(`Server is started on ${PORT}`);
});

