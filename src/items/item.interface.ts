export interface BaseItem {
    name: string;
    descriptoin: string;
    price: number;
    image: string;
}

export interface Item extends BaseItem {
    id: number;
}

