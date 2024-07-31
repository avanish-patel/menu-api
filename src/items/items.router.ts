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
itmesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: BaseItem = req.body;

        const newItem: Item = await ItemService.create(item);

        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).send((<Error>e).message);
    }
});


// PUT items/:id
itmesRouter.put("/:id", async (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id, 10);

    try {

        const itmeToUpdate: BaseItem = req.body;

        // get if item exist for id
        const existingItem: Item = await ItemService.find(id);

        // if does, then update and return 200
        if (existingItem) {
            const updatedItem = await ItemService.update(id, itmeToUpdate);
            return res.status(200).json(updatedItem);
        }

        // if doesn't then create one and return 201
        const newItem = await ItemService.create(itmeToUpdate);
        return res.status(201).json(newItem);

    } catch (e) {
        res.status(500).send((<Error>e).message);
    }
});

// DELETE items/:id
itmesRouter.delete("/:id", async (req: Request, res: Response) => {

    try {
        const id: number = parseInt(req.params.id, 10);

        await ItemService.remove(id);

        res.status(204);
    } catch (e) {
        res.status(500).send((<Error>e).message);
    }
});
