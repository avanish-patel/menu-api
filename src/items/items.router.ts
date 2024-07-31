/**
 * Rquried external modules & interfaces
 */
import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";

/**
 * Router defination
 */
export const itmesRouter = express.Router();

/**
 * Controller Definations
 */

// GET items
itmesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.findAll();

        res.status(200).send(items);
    } catch (e) {
        res.status(500).send((<Error>e).message);
    }
});

// GET itmes/:id
itmesRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const item: Item = await ItemService.find(id);

        if (item) {
            res.status(200).send(item);
        }
        res.status(404).send(`Item not found for id: ${id}`);
    } catch (e) {
        res.status(500).send((<Error>e).message);
    }
});


// POST items


// PUT items/:id


// DELETE items/:id

