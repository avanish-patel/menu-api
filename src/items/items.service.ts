/**
 * Data Model interfaces
 */

import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";

/**
 * In Memory Store
 */

let items: Items = {
    1: {
        id: 1,
        name: "Burger",
        descriptoin: "Tasty",
        price: 599,
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        name: "Pizza",
        descriptoin: "Cheesy",
        price: 299,
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
    },
    3: {
        id: 3,
        name: "Tea",
        descriptoin: "Informative",
        price: 199,
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
}

/**
 * Service Methods
 */

export const findAll = async (): Promise<Item[]> => Object.values(items);

export const find = async (id: number): Promise<Item> => items[id];

export const create = async (newItem: BaseItem): Promise<Item> => {

    const id = new Date().valueOf();

    items[id] = {
        id,
        ...newItem
    }

    return items[id];
};

export const update = async (id: number, itemToUpdate: BaseItem): Promise<Item | null> => {

    const item = await find(id);

    if (!item) {
        return null;
    }

    items[id] = { id, ...itemToUpdate };

    return items[id];
};

export const remove = async (id: number): Promise<null | void> => {

    const itemToDelete = await find(id);

    if (!itemToDelete) {
        return null;
    }
    delete items[id];
}

